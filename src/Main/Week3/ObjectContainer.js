import React from 'react';
import middle from '../../assets/splash3_objects/object1.svg';
import right from '../../assets/splash3_objects/object2.svg';
import eye from '../../assets/splash3_objects/object3.svg';


export default function ObjectContainer() {
  const middlePos = {
    position: "absolute",
    bottom: "-147px",
    left: "calc(100vw/2 - 147px)",
    mixBlendMode: "color-dodge"
  }
  const rightPos = {
    position: "absolute",
    bottom: "-210px",
    right: "-214px",
    mixBlendMode: "color-dodge"
  }
  const eyePos = {
    position: "absolute",
    top: "calc(0px )",
    left: "calc((100vw / 4) - 710px)",
    zIndex: 1,
    mixBlendMode: "color-dodge"
  }


  return (
    <>
      <img src={middle} style={middlePos} className="splashOneObject" />
      <img src={right} style={rightPos} className="splashOneObject" />
      <img src={eye} style={eyePos} className="splashOneObject" />
    </>
  )
}
