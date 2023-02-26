import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ImageCardModal from './ImageCardModal';

const ImageCard = ({image}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    return (
        <>
            <div className='card' onClick={()=>handleOpen()}>
                <img style={{ width: "100%", height: image.height / 10 }} alt="" src={image.urls.regular?image.urls.regular:image.urls.raw}></img>
                <div className='card__details' style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                    <div style={{ display: "flex" }}>
                        <Avatar src={image.user.profile_image.large} />
                        <div className='user__details'>
                            <span className='user__name'>{image.user.name}</span>
                            <span className='user__instagram_id'>{image.user.instagram_username ? `@${image.user.instagram_username}` : ""}</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: "center" }}>
                        <ThumbUpOutlinedIcon />
                        <span>{image.likes}</span>
                    </div>
                </div>
            </div>
            <ImageCardModal open={open} setOpen={setOpen} image={image}/>
        </>
    )
}

export default ImageCard