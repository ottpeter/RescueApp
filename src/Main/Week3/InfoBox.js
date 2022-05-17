import React from 'react';
import AudioPlayerNftStorage from '../../Common/AudioPlayerNftStorage';
import Box from './Box';
import Desc from './Desc';
import SongName from './SongName';
import titleImage from '../../assets/multiverseTitleTooBig.png';
import ArtistList from './ArtistList';
import Buy from './Buy';


export default function InfoBox({tokenId, metadata, newAction}) {
  const screenWidth = window.screen.availWidth;
  const extra = JSON.parse(metadata.extra);

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

  const preludeMusicNftStorageLink = "https://bafybeif55rfqftq6jkpuabvxuj2zm555zb5dpr6z4ha4m6dpfxodu5lobi.ipfs.nftstorage.link/";

  return (
    <div>
      <SongName title={"Multiverse"} image={titleImage} fontSettings={fontSettings} />
      <div id="splashInfoFlex" className="Week2splashInfoFlex">
        {(screenWidth < 1200) && (
          <div className="previewBoxItem">
            <AudioPlayerNftStorage nftStorageLink={preludeMusicNftStorageLink} color={"#F2F2F2"} dark={false} />
          </div>
        )}
        <div id="Week2splashArtistDescBox">
          <ArtistList fontSettings={fontSettings} list={aList} />
          <Desc desc={metadata.description} fontSettings={fontSettings} />
        </div>
        <Box tokenId={tokenId} gen={extra.generation} price={extra.original_price} fontSettings={fontSettings} newAction={newAction} />
      </div>
      <Buy tokenId={tokenId} price={extra.original_price} newAction={newAction} fontSettings={fontSettings} />
    </div>
  )
}

