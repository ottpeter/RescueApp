import React from 'react'

const descBlock1 = "“Home” 《家》is the first song on Supa Mojo’s three-song EP “Home Will Dream”《家想梦》produced by Dae Kim. She shares sentiments around leaving home, dealing with the grief of losing her brother, the process of healing (remove-and the return home)";
const descBlock2 = "NFT purchase includes the “Home Will Dream” EP Package & KL Graffiti book curated by her brother Champ Teh aka Jeng. Partial proceeds go to Life Line Association, to support mental health awareness and suicide prevention.  (Free Shipping of EP package & book in Malaysia Only)";


export default function Desc({desc, fontSettings}) {
  const style = {
    fontFamily: fontSettings.secondFamily,
    fontSize: fontSettings.normalSize,
    textTransform: "uppercase",
    fontWeight: "400",
    lineHeight: "15px",
    letterSpacing: "0.05em",
    color: fontSettings.color,
  }

  return (
    <div id="splashDesc" className="splashInfoElement Week2Desc" style={style}>
      <p>{descBlock1}</p>
      <p>{descBlock2}</p>
    </div>
  )
}