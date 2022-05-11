import React from 'react'

export default function ThePicture({image}) {
  return (
    <img 
      id="splashPicture" 
      alt="Picture loading..."
      src={image}
    >
    </img>
  )
}
