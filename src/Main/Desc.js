import React from 'react'

export default function Desc({desc, fontSettings}) {
  const style = {
    fontFamily: fontSettings.family,
    fontSize: fontSettings.normalSize
  }

  return (
    <div id="splashDesc" className="splashInfoElement" style={style}>
      {desc}
    </div>
  )
}
