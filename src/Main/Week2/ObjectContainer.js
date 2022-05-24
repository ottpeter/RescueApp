import React from 'react';
import tree from '../../assets/splash2_objects/tree.png';        //svg is 1 mb
import dolphins from '../../assets/splash2_objects/dolphins.svg';
import play from '../../assets/splash2_objects/play.svg';



export default function ObjectContainer() {
  const treePos = {
    position: "absolute",
    bottom: "80px",
    right: "-200px"
  }
  const dolphinsPos = {
    position: "absolute",
    bottom: "70px",
    left: "40%"
  }
  const playPos = {
    position: "absolute",
    top: "80px",
    left: "0x"
  }
  

  return (
    <>
      <img src={tree} style={treePos} className="splashOneObject" />
      <img src={dolphins} style={dolphinsPos} className="splashOneObject" />
      <img src={play} style={playPos} className="splashOneObject" />
    </>
  )
}
