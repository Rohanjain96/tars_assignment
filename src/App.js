import './App.css';
import Header from './Components/Header';
import ImageList from './Components/ImageList';
import { url } from './Constants';
import axios from "axios"
import { useEffect, useState } from 'react';
import Loading from './Components/Loading/Loading';

function App() {
  const [imageList, setImageList] = useState([])
  const [searchMode, setSearchMode] = useState(false)
  const fetchImages = async () => {
    const images = await axios(`${url}photos/random?client_id=${process.env.REACT_APP_UNSPLASH_TOKEN}&count=30`)
    setImageList((prev)=>[...prev,...images.data])
  }
  const handleScroll = ()=>{
      if(window.innerHeight + document.documentElement.scrollTop +1 > document.documentElement.scrollHeight){
        fetchImages()
    }
  }
  
  useEffect(()=>{
    if(!searchMode){
    window.addEventListener("scroll",handleScroll)
  }
  else{
    window.removeEventListener("scroll",handleScroll)
  }
    return ()=> window.removeEventListener("scroll",handleScroll)
  },[searchMode])

  return (
    <>
      <Header setImageList={setImageList} searchMode={searchMode} setSearchMode={setSearchMode} imageList={imageList} />
      {imageList.length>0?<ImageList images={imageList}/>:<Loading/>}
    </>
  );
}

export default App;
