import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import Wallet from './Wallet';
import hamburger from '../assets/hamburger.svg';
import daoLogo from '../assets/DaoLogo.svg';


/** Top Menu for Main */
export default function TopMenuSplash1({setShowWallet, showWallet}) {
  const screenWidth = window.innerWidth;
  const [menuOpen, setMenuOpen] = useState(false);
  const [splashMenuOpen, setSplashMenuOpen] = useState(false);

  function hamburgerClicked() {
    setMenuOpen(!menuOpen);
    setShowWallet(false);
  }

  function splashDropdownClicked() {
    setSplashMenuOpen(!splashMenuOpen);
    setShowWallet(false);
  }


  if (screenWidth < 1200) {                               // This is the hamburger view
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
            setSplashMenuOpen={setSplashMenuOpen}
          />
        </nav>

        {menuOpen && (
          <div id="dropdownContainer" className="mobileDropdownContainer">
              <Link to={'/my-nfts'} className="hamburgerElement">MY NFTS</Link>
              {/** List of the drops, we will append this as we go */}
              <Link to={'/weekone'} className="controlsButton hamburgerElement">Week One</Link>
              <Link to={'/weektwo'} className="controlsButton hamburgerElement">Week Two</Link>
              <Link to={'/weekthree'} className="controlsButton hamburgerElement">Week Three</Link>
              <Link to={'/weekfour'} className="controlsButton hamburgerElement">Week Four</Link>
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
        <button onClick={splashDropdownClicked} className="controlsButton menuButton">SPLASH DROPS</button>
        <Link to={'/my-nfts'} className="controlsButton menuButton">MY NFTS</Link>

        {splashMenuOpen && (
          <div id="dropdownContainer">
            {/** List of the drops, we will append this as we go */}
            <Link to={'/weekone'} className="controlsButton menuButton">Week One</Link>
            <Link to={'/weektwo'} className="controlsButton menuButton">Week Two</Link>
            <Link to={'/weekthree'} className="controlsButton menuButton">Week Three</Link>
            <Link to={'/weekfour'} className="controlsButton menuButton">Week Four</Link>
          </div>
        )}

        <Wallet 
          setShowWallet={setShowWallet}
          showWallet={showWallet}
          setMenuOpen={setMenuOpen}
          setSplashMenuOpen={setSplashMenuOpen}
        />
      </nav>
    )
  }

}
