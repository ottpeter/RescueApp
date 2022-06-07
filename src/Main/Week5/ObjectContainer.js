import React from 'react';
import logo from '../../assets/splash5_objects/VandalLogo.svg';


export default function ObjectContainer() {
  const logoPos = {
    position: "absolute",
    bottom: "2%",
    right: "5%"
  }
  

  return (
    <>
      <img src={logo} style={logoPos} className="splashOneObject" />
    </>
  )
}
