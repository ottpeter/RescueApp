import React from 'react'


export default function Desc({desc, fontSettings}) {
  const style = {
    fontFamily: fontSettings.secondFamily,
    fontSize: fontSettings.normalSize,
    fontWeight: "400",
    lineHeight: "15px",
    letterSpacing: "0.02em",
    color: fontSettings.color,
  }

  return (
    <div id="splashDesc" className="splashInfoElement Week2Desc" style={style}>
      {desc}
    </div>
  )
}