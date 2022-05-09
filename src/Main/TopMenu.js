import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import Wallet from './Wallet';
import hamburger from '../assets/hamburger.svg';
import daoLogo from '../assets/DaoLogo.svg';


/** Top Menu for Main */
export default function TopMenuSplash1({setShowWallet, showWallet}) {
  const screenWidth = window.screen.availWidth;
  const [menuOpen, setMenuOpen] = useState(false);

  function hamburgerClicked() {
    setMenuOpen(!menuOpen);
    setShowWallet(false);
  }

  if (screenWidth < 1200) {                               // This is the hamburger view
    console.log("hello world! :)")
    return (
      <>
        <nav id="splash-1-nav">
          <button onClick={hamburgerClicked} className="hamburgerIcon">
            <img src={hamburger} alt='Menu'></img>
          </button>
          <Wallet 
            setShowWallet={setShowWallet}
            showWallet={showWallet}
            setMenuOpen={setMenuOpen}
          />
        </nav>

        {menuOpen && (
          <div id="splash-1-menu-container">
            <Link to={'/my-nfts'} className="hamburgerElement">MY NFTS</Link>
            <Link to={''} className="hamburgerElement"></Link>
            <Link to={''} className="hamburgerElement"></Link>
          </div>
        )}
      </>
    )
  } else {                                                // This is the normal view
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
          setMenuOpen={setMenuOpen}
          transparent={true}
        />
      </nav>
    )
  }

}
