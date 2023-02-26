import { Avatar, Backdrop, Box, Modal } from '@mui/material'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';

const ImageCardModal = ({ open, setOpen, image }) => {
  const handleClose = () => setOpen(false);
  const style = (theme) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 450,
    [theme.breakpoints.down(768)]: {
      width: "90%",
    }
  });

  return (
    <div>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: Backdrop }}
      >
        <Box sx={style}>
          <img src={image.urls.raw} width="100%" height="100%" alt={image.alt_description}></img>
          <div className='card__details'>
            <div className='card__details--upperbox'>
              <div style={{ display: "flex" }}>
                <Avatar src={image.user.profile_image.large} />
                <div className='user__details'>
                  <span className='user__name'>{image.user.name}</span>
                  <span className='user__instagram_id'>{image.user.instagram_username ? `@${image.user.instagram_username}` : ""}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: "center" }}>
                {image.views ?
                  <span style={{ marginRight: "8px", display: "flex", alignItems: "center",marginTop:"5px" }}>
                    <VisibilityIcon />
                    {image.views}
                  </span> : ""}
                <span style={{ marginRight: "5px", display: "flex", alignItems: "center" }}>
                  <ThumbUpOutlinedIcon />
                  {image.likes}
                </span>
              </div>
            </div>
            <div className='card__details--lowerbox'>
              {
                image.tags && image.tags.map((tag) => {
                  return <span className='user__tags'>{tag.title}</span>
                })
              }
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ImageCardModal