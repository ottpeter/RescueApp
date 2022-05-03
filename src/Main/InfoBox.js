import React from 'react'
import AudioPlayer from '../Common/AudioPlayer'
import AudioPlayerNftStorage from '../Common/AudioPlayerNftStorage';
import ArtistList from './ArtistList'
import Box from './Box'
import Buy from './Buy'
import Desc from './Desc'
import SongName from './SongName'

export default function InfoBox({tokenId, metadata, newAction}) {
  const extra = JSON.parse(metadata.extra);

  const fontSettings = {
    family: 'Bebas',
    size: '70px',
    buttonSize: '32px',
    normalSize: '14px'
  }

  const aList = [
    {
      name: "masia one ",
      twitter: "https://twitter.com/masiaone",
      insta: "https://www.instagram.com/masiaone/",
      youtube: "testYT"
    },
    {
      name: "noyz134",
      twitter: "https://twitter.com/chew_wui",
      insta: "http://www.instagram.com/noyz134",
      youtube: "otherYT"
    },
    {
      name: "janine annice",
      twitter: "https://twitter.com/JanineAnnice",
      insta: "http://www.instagram.com/janineannice",
      youtube: "otherYT"
    },
    {
      name: "alx",
      twitter: "https://twitter.com/alxtalhinhas",
      insta: "http://www.instagram.com/alxtalhinhas",
      youtube: "otherYT"
    },
    {
      name: "jcb",
      twitter: "https://twitter.com/JCBBeats",
      insta: "http://www.instagram.com/JustinCBurkholder",
      youtube: "otherYT"
    },
  ]

  const preludeMusicNftStorageLink = "https://bafybeiehqpn5z5izotm5ddnhvqkoj3ovylgqnnpz3wuhmrhurwh5dwanii.ipfs.nftstorage.link/";

  return (
    <div id="splashInfoFlex">
      <SongName title={metadata.title} fontSettings={fontSettings} />
      <div id="splashArtistDescBox">
        <ArtistList fontSettings={fontSettings} list={aList} />
        <Desc desc={metadata.description} fontSettings={fontSettings} />
      </div>
      <Box tokenId={tokenId} gen={extra.generation} price={extra.original_price} fontSettings={fontSettings} newAction={newAction} />
    </div>
  )
}

/*
      <div className="previewBoxItem">
        <AudioPlayerNftStorage nftStorageLink={preludeMusicNftStorageLink} />
      </div>

*/