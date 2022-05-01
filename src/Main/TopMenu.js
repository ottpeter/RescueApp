import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import Wallet from './Wallet';
import { totalMinted } from '../utils';
import logo from '../assets/TopLeftLogo.png'


/** Top Menu for Main */
export default function TopMenu({setShowWallet, showWallet}) {
  const [digits, setDigits] = useState([]);

  useEffect(async () => {
    let count = await totalMinted();
    if (count === -1) count = 0;
    else {
      let digitArray = [0, 0, 0, 0, 0, 0];
      let divider = 1000000;
      for (let i = 0; i < digitArray.length; i++) {
        divider = divider / 10;
        digitArray[i] = Math.floor(count / divider);
        count = count - (digitArray[i] * divider);
      }
      setDigits(digitArray);
    };
  }, []);


  return (
    <nav id="mainNav">
      <div className="leftLogo">
        <Link to={'/'} className="logo controlsButton">
          <img src={logo} alt='Logo' id="topLeftImage" />
        </Link>
      </div>

      <div className="logo">
        <div id="counter">
          <div className="digitLabel">TOTAL MINTED </div>
          <div className="digit">{digits[0]}</div>
          <div className="digit">{digits[1]}</div>
          <div className="digit">{digits[2]}</div>
          <div className="digit">{digits[3]}</div>
          <div className="digit">{digits[4]}</div>
          <div className="digit">{digits[5]}</div>
        </div>
      </div>
      
      <Link to={'/my-nfts'} className="controlsButton menuButton">MY NFTS</Link>
      <Wallet 
        setShowWallet={setShowWallet}
        showWallet={showWallet}
      />
    </nav>
  )
}
