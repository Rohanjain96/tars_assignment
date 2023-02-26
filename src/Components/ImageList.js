import React from 'react'
import ImageCard from './ImageCard'

const ImageList = ({ images }) => {
    return (
        <>
            <div className='ImageGrid'>
                {
                    images.map((image,index)=>{
                        return image&&<ImageCard image={image} key={index} />
                    })
                }
            </div>
        </>
    )
}

export default ImageList