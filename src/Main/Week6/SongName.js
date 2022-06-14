import React from 'react'


export default function SongName({title, image}) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const overflow = ((screenHeight < 814) && (screenWidth > 1200)) ? true : false;

  const style = {
    fontFamily: "Inter",
    fontWeight: "normal",
    lineHeight: "84px",
    letterSpacing: "0.01em",
    textTransform: "uppercase"
  }

  const plc = {
    marginTop: "-30px",
  }


  if (!overflow) {
    return (
      <div id="splashTitleWeek6">
        <img src={image} alt={title} />
      </div>
    )
  } else {
    return (
      <div id="splashTitleWeek6">
        <img src={image} alt={title} style={plc} />
      </div>
    )
  }
}
