import React from 'react';
import AudioPlayerNftStorage from '../../Common/AudioPlayerNftStorage';
import Box from './Box';
import Desc from './Desc';
import ArtistList from './ArtistList';
import Buy from './Buy';


export default function InfoBox({tokenId, metadata, newAction}) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const extra = JSON.parse(metadata.extra);
  

  const fontSettings = {
    family: 'Inter',
    secondFamily: 'Inter',
    size: '14px',
    color: "#F2F2F2",
    buttonSize: '16px',
    normalSize: '12px'
  }

  const aList = [
    {
      name: "Rare Vandal",
      telegram: "https://t.me/VanDAOism",
      twitter: "https://twitter.com/vandigital",
      insta: "https://www.instagram.com/vandigital/",
      facebook: "https://www.facebook.com/Vandigital",
      youtube: "https://www.youtube.com/channel/UCEW2jxaki4FH3TYKLJlVjwA"
    }
  ]

  const fetchLink = "https://daorecords.io:8443/fetch?cid=" + extra.music_cid;                 // Fetch url for our server


  return (
    <div id="splash5RightContainer">
      <div id="splashInfoFlex" className="Week2splashInfoFlex">
        <div id="Week2splashArtistDescBox">
          <ArtistList fontSettings={fontSettings} list={aList} />
          <Desc desc={metadata.description} fontSettings={fontSettings} />
        </div>
        <Box gen={extra.generation} price={extra.original_price} fontSettings={fontSettings} />
      </div>
      <Buy tokenId={tokenId} price={extra.original_price} newAction={newAction} fontSettings={fontSettings} />
    </div>
  )
}

