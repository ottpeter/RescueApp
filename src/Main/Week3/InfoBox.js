import React from 'react';
import AudioPlayerNftStorage from '../../Common/AudioPlayerNftStorage';
import Box from './Box';
import Desc from './Desc';
import SongName from './SongName';
import titleImage from '../../assets/multiverseTitleTooBig.png';
import ArtistList from './ArtistList';
import Buy from './Buy';


export default function InfoBox({tokenId, metadata, newAction}) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const extra = JSON.parse(metadata.extra);
  const overflow = ((screenHeight < 814) && (screenWidth > 1200)) ? ({ overflowY: "scroll" }) : null;

  const fontSettings = {
    family: 'Inter',
    secondFamily: 'Inter',
    size: '14px',
    color: "#F2F2F2",
    buttonSize: '16px',
    normalSize: '14px'
  }

  const aList = [
    {
      name: "mantravine",
      facebook: "https://www.facebook.com/Mantravine/",
      twitter: "https://twitter.com/mantravine",
      insta: "https://www.instagram.com/mantravine/",
      youtube: "https://www.youtube.com/user/mantravine",
      tiktok: "https://www.tiktok.com/@mantravine"
    },
  ]

  const fetchLink = "https://daorecords.io:8443/fetch?cid=" + extra.music_cid;                 // Fetch url for our server


  return (
    <div style={overflow}>
      <SongName title={"Multiverse"} image={titleImage} fontSettings={fontSettings} />
      <div id="splashInfoFlex" className="Week2splashInfoFlex">
        {(screenWidth < 1200) && (
          <div className="previewBoxItem">
            <AudioPlayerNftStorage nftStorageLink={fetchLink} color={"#F2F2F2"} dark={false} />
          </div>
        )}
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