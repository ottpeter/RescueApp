import React from 'react'
import InfoBox from './InfoBox'
import ThePicture from './ThePicture'

export default function SplashLandingGrid({tokenId, metadata, image, newAction}) {
  return (
    <div id="splashLandingGrid">
      <ThePicture image={image} />
      <InfoBox 
        tokenId={tokenId}
        metadata={metadata}
        image={image}
        newAction={newAction}
      />
    </div>
  )
}
