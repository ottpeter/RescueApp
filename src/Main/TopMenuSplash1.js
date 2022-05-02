import React from 'react';
import { Link } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import Wallet from './Wallet';
import logo from '../assets/SoundSplashLogo.svg'


/** Top Menu for Main */
export default function TopMenuSplash1({setShowWallet, showWallet}) {
  return (
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
  )
}
