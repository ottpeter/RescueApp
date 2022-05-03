import React from 'react';
import { Link } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import Wallet from './Wallet';
import logo from '../assets/SoundSplashLogo.svg'
import daoLogo from '../assets/DaoLogo.svg';


/** Top Menu for Main */
export default function TopMenuSplash1({setShowWallet, showWallet}) {
  return (
    <nav id="splash-1-nav">
      <Link to={'/'} className='daoLogo'>
        <img src={daoLogo} alt={'DAOrevords'}/>
        <p>.io</p>
      </Link>
      <Link to={''} className="controlsButton menuButton"></Link>
      <Link to={''} className="controlsButton menuButton"></Link>
      <Link to={'/my-nfts'} className="controlsButton menuButton">MY NFTS</Link>
      <Wallet 
        setShowWallet={setShowWallet}
        showWallet={showWallet}
        transparent={true}
      />
    </nav>
  )
}
