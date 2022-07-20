import React from 'react';
import cup from '../../assets/splash11_objects/cup.png';
import calendar from '../../assets/splash11_objects/calendar.png';
import clock from '../../assets/splash11_objects/clock.png';
import worldComputer from '../../assets/splash11_objects/world_computer.png';


export default function ObjectContainer() {
  const cupPos = {
    position: "absolute",
    width: "10vw",
    top: "16vh",
    right: "-2.8vw"
  }
  const clockPos = {
    position: "absolute",
    width: "10vw",
    top: "5%",
    left: "2vw"
  }
  const calendarPos = {
    position: "absolute",
    width: "12vw",
    bottom: "4vh",
    left: "calc(50% - 6vw)"
  }
  const worldComputerPos = {
    position: "absolute",
    width: "10vw",
    bottom: "-6%",
    right: "2%"
  }
  

  return (
    <>
      <img src={cup} style={cupPos} className="splashOneObject" />
      <img src={clock} style={clockPos} className="splashOneObject" />
      <img src={calendar} style={calendarPos} className="splashOneObject" />
      <img src={worldComputer} style={worldComputerPos} className="splashOneObject" />
    </>
  )
}
