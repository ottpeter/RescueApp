import React from 'react'

export default function SongName({title, fontSettings}) {
  const style = {
    fontFamily: fontSettings.family,
    fontSize: fontSettings.size,
    fontWeight: "normal",
    lineHeight: "84px",
    letterSpacing: "0.01em",
    textTransform: "uppercase"

  }

  return (
    <div id="splashTitle" className="splashInfoElement" style={style}>
      {title}
    </div>
  )
}
