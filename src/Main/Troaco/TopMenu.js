import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import Wallet from './Wallet';


/** Top Menu for Troaco */
export default function TopMenu({setShowWallet, showWallet, changePage}) {
  return (
    <nav aria-label='Site Navigation' id="troacoTopNav">      
      <button onClick={() => console.log("TODO")} className="controlsButton troacoMenuButton" >GUESTBOOK</button>
      <Link to={'/troacomynfts'} className="controlsButton troacoMenuButton">MY NFTS</Link>
      <Wallet 
        setShowWallet={setShowWallet}
        showWallet={showWallet}
      />
    </nav>
  )
}