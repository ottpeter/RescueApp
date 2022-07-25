import React from 'react';
import Footer from './Footer';
import ThePicture from './ThePicture';
import InfoBox from './InfoBox';
import SongName from './SongName';
import titleImage from '../../assets/splash10_title.png';


export default function SplashLandingGrid({tokenId, metadata, newAction, playing, setPlay}) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const overflow = ((screenHeight < 718) && (screenWidth > 1200)) ? ({ overflowY: "scroll" }) : null;

  return (
    <div id="splashLandingGrid5" style={overflow}>
      <SongName title={""}  />
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
