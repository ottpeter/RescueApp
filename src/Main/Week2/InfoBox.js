import React from 'react';
import AudioPlayerNftStorage from '../../Common/AudioPlayerNftStorage';
import Box from './Box';
import Week2Desc from './Desc';
import SongName from '../SongName';
import titleImage from '../../assets/splash2_title.svg';
import ArtistList from './ArtistList';


export default function InfoBox({tokenId, metadata, newAction}) {
  const screenWidth = window.innerWidth;
  const extra = JSON.parse(metadata.extra);

  const fontSettings = {
    family: 'Inter',
    secondFamily: 'Inter',
    size: '14px',
    color: "#000000",
    buttonSize: '32px',
    normalSize: '14px'
  }

  const aList = [
    {
      name: "DEDEUKWU",
      twitter: "https://twitter.com/_dedeukwu/status/1493308920676466697?s=21&t=xd4BJufPNKs2CxsiOizdew",
      insta: "https://www.instagram.com/p/CbLxPYbIohY/?utm_medium=copy_link",
      youtube: "https://youtu.be/Sk6oNlDtGec"
    },
  ]

  const fetchLink = "https://daorecords.io:8443/fetch?cid=" + extra.music_cid;                 // Fetch url for our server

  return (
    <div>
      <SongName title={"Put It on Me"} image={titleImage} fontSettings={fontSettings} />
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
        <Box tokenId={tokenId} gen={extra.generation} price={extra.original_price} fontSettings={fontSettings} newAction={newAction} />
      </div>
    </div>
  )
}

