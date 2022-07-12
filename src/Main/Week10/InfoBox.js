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
  
  let userAgentString = navigator.userAgent;
  let safariAgent = userAgentString.indexOf("Safari") > -1;
  if (userAgentString.indexOf("Chrome") > -1) safariAgent = false;                             // Some browsers are spoofing user agent by adding a string like
  if (userAgentString.indexOf("Firefox") > -1) safariAgent = false;                            // Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36
  console.log("Is Safari? ", safariAgent);

  const fontSettings = {
    family: 'Inter',
    secondFamily: 'Inter',
    size: '14px',
    color: "#000000",
    buttonSize: '16px',
    normalSize: '12px'
  }

  const aList = [
    {
      name: "reespect",
      twitter: "https://twitter.com/itsreespect",
      insta: "https://www.instagram.com/itsreespect/?hl=en",
      facebook: "https://www.facebook.com/itsreespect/"
    },
  ]

  const fetchLink = "https://daorecords.io:8443/fetch?cid=" + extra.music_cid;                 // Fetch url for our server


  return (
    <div id="splash5RightContainer">
      <div id="splashInfoFlex" className="Week2splashInfoFlex Week2splashInfoFlex" >
        <div id="Week2splashArtistDescBox">
          <ArtistList fontSettings={fontSettings} list={aList} />
          <Desc desc={metadata.description} fontSettings={fontSettings} />
        </div>
        {safariAgent &&  <div className="previewBoxItem" style={{ marginTop: "32px" }}>
          <AudioPlayerNftStorage 
            nftStorageLink={fetchLink} 
            color={"#F2F2F2"}
            dark={false}
        /></div>}
        <Box gen={extra.generation} price={extra.original_price} fontSettings={fontSettings} />
      </div>
      <Buy tokenId={tokenId} price={extra.original_price} newAction={newAction} fontSettings={fontSettings} />
    </div>
  )
}

