import React from 'react';
import camera_to_left from '../assets/splash1_objects/camera_to_left.svg';
import camera_to_right from '../assets/splash1_objects/camera_to_right.svg';
import phone_1 from '../assets/splash1_objects/phone1.svg';
import phone_2 from '../assets/splash1_objects/phone2.svg';
import phone_3 from '../assets/splash1_objects/phone3.svg';
import phone_4 from '../assets/splash1_objects/phone4.svg';
import text from '../assets/splash1_objects/text.svg';

export default function Splash1ObjectContainer() {
  const camToLeft = {
    position: "absolute",
    top: "100px",
    right: "1%"
  }
  const camToRight = {
    position: "absolute",
    top: "200px",
    left: "1%"
  }
  const mobileOnePos = {
    position: "absolute",
    bottom: "-15px",
    left: "71%"
  }
  const mobileOneCopyPos = {
    position: "absolute",
    bottom: "-15px",
    left: "75%"
  }
  const mobileThreePos = {
    position: "absolute",
    bottom: "16%",
    left: "3%"
  }
  const mobileTwoPos = {
    position: "absolute",
    top: "100px",
    left: "54%"
  }
  const mobileFourPos = {
    position: "absolute",
    bottom: "9%",
    left: "58%"
  }
  const textObjPos = {
    position: "absolute",
    left: "24%",
    bottom: "10%"
  }
  

  return (
    <>
      <img src={camera_to_right} style={camToRight} className="splashOneObject" />
      <img src={camera_to_left} style={camToLeft} className="splashOneObject" />
      <img src={phone_1} style={mobileOnePos} className="splashOneObject" />
      <img src={phone_1} style={mobileOneCopyPos} className="splashOneObject" />
      <img src={phone_2} style={mobileTwoPos} className="splashOneObject" />
      <img src={phone_3} style={mobileThreePos} className="splashOneObject" />
      <img src={phone_4} style={mobileFourPos} className="splashOneObject" />
      <img src={text} style={textObjPos} className="splashOneObject" />
    </>
  )
}
