import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import Wallet from './Wallet';
import { totalMinted } from '../utils';
import logo from '../assets/SoundSplashLogo.png'


/** Top Menu for Main */
export default function TopMenuSplash1({setShowWallet, showWallet}) {
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
    <>
      <div className="blurBox">
      </div>
        <nav id="splash-1-nav">
          <div className='splashLogo'>
            <img src={logo} alt={'SoundSplash'} />
          </div>
          <Link to={''} className="controlsButton menuButton"></Link>
          <Link to={''} className="controlsButton menuButton"></Link>
          <Link to={'/my-nfts'} className="controlsButton menuButton">MY NFTS</Link>
          <Wallet 
            setShowWallet={setShowWallet}
            showWallet={showWallet}
          />
        </nav>
    </>
  )
}
