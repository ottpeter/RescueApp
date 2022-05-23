import React from 'react';
import Footer from './Footer';
import ThePicture from '../ThePicture';
import InfoBox from './InfoBox';

export default function SplashLandingGrid({tokenId, metadata, image, newAction}) {
  const screenWidth = window.innerWidth;  

  return (
    <div id="splashLandingGrid">
      <ThePicture image={image} imageCID={metadata.media} />
      <InfoBox
        tokenId={tokenId}
        metadata={metadata}
        image={image}
        newAction={newAction}
      />
      {(screenWidth <= 1200) && <Footer />}
    </div>
  )
}
