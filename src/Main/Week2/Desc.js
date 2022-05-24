import React from 'react'

export default function Desc({desc, fontSettings}) {
  const style = {
    fontFamily: fontSettings.secondFamily,
    fontSize: fontSettings.normalSize,
    textTransform: "uppercase",
    fontWeight: "400",
    lineHeight: "22px",
    letterSpacing: "0.02em",
    color: fontSettings.color,
  }

  return (
    <div id="splashDesc" className="splashInfoElement Week2Desc" style={style}>
      {desc}
    </div>
  )
}
