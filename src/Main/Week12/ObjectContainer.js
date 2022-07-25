import React from 'react';
import flower1 from '../../assets/splash12_objects/flower1.svg';
import flower2 from '../../assets/splash12_objects/flower2.svg';
import flower3 from '../../assets/splash12_objects/flower3.svg';
import flower4 from '../../assets/splash12_objects/flower4.svg';
import flower5 from '../../assets/splash12_objects/flower5.svg';
import flower6 from '../../assets/splash12_objects/flower6.svg';


export default function ObjectContainer() {
  const flower1Pos = {
    position: "absolute",
    width: "36vw",
    top: "-28vh",
    left: "-3vw"
  }
  const flower5Pos = {
    position: "absolute",
    width: "24vw",
    top: "calc(50% - 20vh)",
    left: "calc(50% - 12vw)"
  }
  const flower3Pos = {
    position: "absolute",
    width: "24vw",
    top: "-28vh",
    right: "1vw"
  }
  const flower4Pos = {
    position: "absolute",
    width: "28vw",
    bottom: "-16vh",
    left: "-5vw"
  }
  const flower6Pos = {
    position: "absolute",
    width: "27vw",
    bottom: "14vh",
    right: "-12vw"
  }
  const flower2Pos = {
    position: "absolute",
    width: "20vw",
    bottom: "-17vh",
    left: "57vw"
  }
  

  return (
    <>
      <img src={flower1} style={flower1Pos} className="splashOneObject" />
      <img src={flower3} style={flower2Pos} className="splashOneObject" />
      <img src={flower2} style={flower3Pos} className="splashOneObject" />
      <img src={flower4} style={flower4Pos} className="splashOneObject" />
      <img src={flower5} style={flower5Pos} className="splashOneObject" />
      <img src={flower6} style={flower6Pos} className="splashOneObject" />
    </>
  )
}
