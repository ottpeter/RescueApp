import React from 'react';
import Footer from './Footer';
import ThePicture from './ThePicture';
import InfoBox from './InfoBox';
import SongName from './SongName';
import titleImage from '../../assets/splash5_title.png';


export default function SplashLandingGrid({tokenId, metadata, newAction, playing, setPlay}) {
  const screenWidth = window.innerWidth;

  return (
    <div id="splashLandingGrid5">
      <SongName title={"Watch your mouth"} image={titleImage}  />
      <ThePicture imageCID={metadata.media} playing={playing} setPlay={setPlay} />
      <InfoBox
        tokenId={tokenId}
        metadata={metadata}
        newAction={newAction}
      />
      {(screenWidth <= 1200) && <Footer />}
    </div>
  )
}
