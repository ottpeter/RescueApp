import React from 'react';
import logo from '../../assets/splash10_objects/logo_obj.png';



export default function ObjectContainer() {
  const logoPos = {
    position: "absolute",
    width: "8vw",
    bottom: "-3%",
    right: "5%",
    transform: "rotate(-12deg)"
  }
  

  return (
    <>
      <img src={logo} style={logoPos} className="splashOneObject" />
    </>
  )
}
