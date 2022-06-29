import React from 'react';
import play from '../../assets/splash8_objects/play.png';
import time from '../../assets/splash8_objects/time.png';
import titleShadow from '../../assets/splash8_objects/titleShadow.png';
import slpTime from '../../assets/splash8_objects/slpTime.png';
import logo from '../../assets/splash8_objects/kyhLogo.svg';



export default function ObjectContainer() {
  const playPos = {
    position: "absolute",
    top: "80px",
    left: "30px"
  }
  const timePos = {
    position: "absolute",
    width: "5vw",
    top: "80px",
    right: "30px"
  }
  const titleShadowPos = {
    position: "absolute",
    width: "12vw",
    top: "12%",
    left: "35%"
  }
  const slpTimePos = {
    position: "absolute",
    width: "8vw",
    bottom: "20px",
    left: "calc(50% - 4vw)"
  }
  const logoPos = {
    position: "absolute",
    width: "8vw",
    bottom: "3%",
    right: "5%"
  }
  

  return (
    <>
      <img src={play} style={playPos} className="splashOneObject" />
      <img src={time} style={timePos} className="splashOneObject" />
      <img src={titleShadow} style={titleShadowPos} className="splashOneObject" />
      <img src={slpTime} style={slpTimePos} className="splashOneObject" />
      <img src={logo} style={logoPos} className="splashOneObject" />
    </>
  )
}
