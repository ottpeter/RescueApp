import React from 'react';
import FooterSplash2 from './FooterSplash2';
import ThePicture from './ThePicture';
import Week2InfoBox from './Week2InfoBox';

export default function SplashLandingGrid({tokenId, metadata, image, newAction}) {
  const screenWidth = window.innerWidth;

  return (
    <div id="splashLandingGrid">
      <ThePicture image={image} imageCID={metadata.media} />
      <Week2InfoBox
        tokenId={tokenId}
        metadata={metadata}
        newAction={newAction}
      />
      {(screenWidth <= 1200) && <FooterSplash2 />}
    </div>
  )
}
