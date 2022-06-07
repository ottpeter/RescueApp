import React from 'react';
import hand from '../../assets/splash4_objects/hand.svg';
import logo from '../../assets/splash4_objects/ManafestVisionLogo.svg';


export default function ObjectContainer() {
  const handPos = {
    position: "absolute",
    top: "-3%",
    left: "42%"
  }
  const logoPos = {
    position: "absolute",
    bottom: "2%",
    right: "5%"
  }
  

  return (
    <>
      <img src={hand} style={handPos} className="splashOneObject" />
      <img src={logo} style={logoPos} className="splashOneObject" />
    </>
  )
}
