import React from 'react'

export default function Buy({tokenId, newAction, fontSettings}) {
  const style = {
    fontFamily: fontSettings.family,
    fontSize: "24px"
  }

  return (
    <button id="splashBuy" className="splashInfoElement" style={style}>
        BUY
    </button>
  )
}
