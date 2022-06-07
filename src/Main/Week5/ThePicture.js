import React from 'react'
import PlayerControls from './PlayerControls'


export default function ThePicture({imageCID, playing, setPlay}) {
  return (
    <div id='pictureContainer5'>
      <img 
        id="splashPicture5" 
        alt="Picture loading..."
        src={`https://daorecords.io:8443/fetch?cid=${imageCID}`}
      >
      </img>
      <PlayerControls playing={playing} setPlay={setPlay} />
    </div>
  )
}

