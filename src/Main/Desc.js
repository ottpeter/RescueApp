import React from 'react'

export default function Desc({desc, fontSettings}) {
  const style = {
    //fontFamily: fontSettings.family,
    fontFamily: "Neue Haas Grotesk Display Pro",
    //fontFamily: "termina",
    fontSize: fontSettings.normalSize,
    textTransform: "uppercase",
    fontWeight: "400",
    lineHeight: "27px",
    letterSpacing: "0.05em",
    color: "#F2F2F2"
  }

  return (
    <div id="splashDesc" className="splashInfoElement" style={style}>
      {desc}
    </div>
  )
}
