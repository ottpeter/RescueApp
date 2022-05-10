import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import hamburger from '../assets/hamburger.svg'
import 'regenerator-runtime/runtime';
import Week2Wallet from './Week2Wallet';
import logo from '../assets/SoundSplashLogo2.svg'


/** Top Menu for Main */
export default function TopMenuSplash2s({setShowWallet, showWallet}) {
  const screenWidth = window.screen.availWidth;
  const [menuOpen, setMenuOpen] = useState(false);

  function hamburgerClicked() {
    setMenuOpen(!menuOpen);
    setShowWallet(false);
  }


  if (screenWidth < 1200) {                               // This is the hamburger view
    return (
      <>
        <nav id="splash-1-nav" className="splash-2-nav">
          <button onClick={hamburgerClicked} className="hamburgerIcon">
            <img src={hamburger} alt='Menu'></img>
          </button>
          <Week2Wallet
            setShowWallet={setShowWallet}
            showWallet={showWallet}
            setMenuOpen={setMenuOpen}
          />
        </nav>

        {menuOpen && (
          <div className="menuColorContainer">
            <div id="splash-1-menu-container">
              <Link to={'/my-nfts'} className="hamburgerElement InterMenu">MY NFTS</Link>
              <Link to={''} className="hamburgerElement InterMenu">X</Link>
              <Link to={''} className="hamburgerElement InterMenu">Y</Link>
            </div>
          </div>
        )}
      </>
    )
  } else {                                                // This is the normal view
    return (
      <nav id="splash-1-nav" className="splash-2-nav">
        <div className='splashLogo'>
          <Link to={'/'}>
            <img src={logo} alt={'SoundSplash'} />
          </Link>
        </div>
        <Link to={''} className="controlsButton menuButton InterMenu"></Link>
        <Link to={''} className="controlsButton menuButton InterMenu"></Link>
        <Link to={'/my-nfts'} className="controlsButton menuButton InterMenu">MY NFTS</Link>
        <Week2Wallet
          setShowWallet={setShowWallet}
          showWallet={showWallet}
          setMenuOpen={setMenuOpen}
        />
      </nav>
    )
  }
  
}

/*

*/