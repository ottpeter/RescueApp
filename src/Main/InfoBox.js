import React from 'react'
import AudioPlayer from '../Common/AudioPlayer'
import ArtistList from './ArtistList'
import Box from './Box'
import Buy from './Buy'
import Desc from './Desc'
import SongName from './SongName'

export default function InfoBox({tokenId, metadata, newAction}) {
  const extra = JSON.parse(metadata.extra);

  const fontSettings = {
    family: 'neue-haas-grotesk-display',
    size: '32px',
    buttonSize: '24px',
    normalSize: '12px'
  }

  const aList = [
    {
      name: "Test Artist",
      twitter: "https://twitter.com/wrongpage",
      insta: "testInsta",
      youtube: "testYT"
    },
    {
      name: "Other Artist",
      twitter: "otherTwitter",
      insta: "otherInsta",
      youtube: "otherYT"
    },
  ]

  return (
    <div id="splashInfoFlex">
      <SongName title={metadata.title} fontSettings={fontSettings} />
      <div id="splashAudioContainer" className="splashInfoElement">
        <AudioPlayer music={null} cid={extra.music_cid} />
      </div>
      <ArtistList fontSettings={fontSettings} list={aList} />
      <Desc desc={metadata.description} fontSettings={fontSettings} />
      <Box gen={extra.generation} price={extra.original_price} fontSettings={fontSettings} />
      <Buy tokenId={tokenId} price={extra.original_price} newAction={newAction} fontSettings={fontSettings} />
    </div>
  )
}
