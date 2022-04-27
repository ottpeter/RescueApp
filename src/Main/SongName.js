import React from 'react'

export default function SongName({title, fontSettings}) {
  const style = {
    fontFamily: fontSettings.family,
    fontSize: fontSettings.size,
    fontWeight: "bold"
  }

  return (
    <div id="splashTitle" className="splashInfoElement" style={style}>
      {title}
    </div>
  )
}
