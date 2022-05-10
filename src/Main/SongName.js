import React from 'react'

export default function SongName({title, fontSettings, image}) {
  const style = {
    fontFamily: fontSettings.family,
    color: fontSettings.color,
    fontSize: fontSettings.size,
    fontWeight: "normal",
    lineHeight: "84px",
    letterSpacing: "0.01em",
    textTransform: "uppercase"

  }


  if (image) {
    return (
      <div id="splashTitle">
        <img src={image} alt={title} />
      </div>
    )
  } else {
    return (
      <div id="splashTitle" style={style}>
        {title}
      </div>
    )
  }
}
