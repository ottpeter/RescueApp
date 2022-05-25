import React from 'react';
import AudioPlayerNftStorage from '../../Common/AudioPlayerNftStorage';
import Box from './Box';
import Week2Desc from './Desc';
import SongName from './SongName';
import titleImage from '../../assets/splash4_title.png';
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
    color: "#000000",
    buttonSize: '16px',
    normalSize: '12px'
  }

  const aList = [
    {
      name: "COMA-CHI",
      twitter: "https://twitter.com/coma_chi",
      insta: "https://www.instagram.com/coma_chi/",
      youtube: "https://www.youtube.com/user/QueensRoom"
    },
    {
      name: "MeccaGodzilla",
      twitter: "https://twitter.com/meccagodzilla",
      insta: "https://www.instagram.com/meccagodzilla",
      youtube: "https://www.youtube.com/manafestvision"
    }
  ]

  const fetchLink = "https://daorecords.io:8443/fetch?cid=" + extra.music_cid;                 // Fetch url for our server


  return (
    <div style={overflow}>
      <SongName title={"Watch your mouth"} image={titleImage} fontSettings={fontSettings} />
      <div id="splashInfoFlex" className="Week2splashInfoFlex">
        {(screenWidth < 1200) && (
          <div className="previewBoxItem">
            <AudioPlayerNftStorage nftStorageLink={fetchLink} color={"#333333"} dark={true} />
          </div>
        )}
        <div id="Week2splashArtistDescBox">
          <ArtistList fontSettings={fontSettings} list={aList} />
          <Week2Desc desc={metadata.description} fontSettings={fontSettings} />
        </div>
        <Box gen={extra.generation} price={extra.original_price} fontSettings={fontSettings} />
      </div>
      <Buy tokenId={tokenId} price={extra.original_price} newAction={newAction} fontSettings={fontSettings} />
    </div>
  )
}

