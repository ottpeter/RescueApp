import React from 'react'

export default function ThePicture({image, imageCID}) {
  return (
    <img 
      id="splashPicture" 
      alt="Picture loading..."
      src={`https://daorecords.io:8443/fetch?cid=${imageCID}`}
    >
    </img>
  )
}

/*src={image}*/