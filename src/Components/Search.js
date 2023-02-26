import { Input} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useCallback, useEffect, useState } from 'react'
import { url } from '../Constants';
import axios from 'axios';

const Search = ({ setImageList,searchMode,setSearchMode}) => {
  const [searchQuery,setSearchQuery] = useState("")
  const [page,setPage] = useState(1)
  const fetchImages = async()=>{
    let queryImages
    if(searchQuery.trim().length>0){
      queryImages = await axios.get(`${url}search/photos?client_id=${process.env.REACT_APP_UNSPLASH_TOKEN}&per_page=10&page=${page}&query=${searchQuery}`) 
      if(queryImages.data.results.length>0){
          setImageList((prev)=>[...prev,...queryImages.data.results])
        }
  }
  else{
    const images = await axios(`${url}photos/random?client_id=${process.env.REACT_APP_UNSPLASH_TOKEN}&count=30`)
    setImageList((prev)=>[...prev,...images.data])
  }
}
  const handleQuery = (event)=>{
    setSearchQuery(event.target.value)
    setPage(1)
    setImageList([])
    if(event.target.value.trim().length>0){
      setSearchMode((prev)=>prev=true)
    }
    else{
      setSearchMode((prev)=>prev=false)
    }
  }

  const handleQueryScroll = async()=>{
      if(window.innerHeight + document.documentElement.scrollTop +1 > document.documentElement.scrollHeight){
        setPage((previous)=>previous=previous+1)
    }
  }

  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  }

  const debounceOnChange = useCallback(debounce(handleQuery, 400), [])
  useEffect(()=>{fetchImages()},[searchQuery,page])

  useEffect(()=>{
    if(searchMode){
      window.addEventListener("scroll",handleQueryScroll)
    }
    else{
      window.removeEventListener("scroll",handleQueryScroll)
    }
    return ()=> window.removeEventListener("scroll",handleQueryScroll)
  },[searchMode])

    return (
        <>
          <div className='search'>
            <Input 
            className='search__input_field' 
            placeholder='Search for images' 
            disableUnderline
            onChange={debounceOnChange} />
            <SearchIcon/>
          </div>
        </>
    )
}

export default Search