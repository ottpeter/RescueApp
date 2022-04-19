import React from 'react';
import GitHub from '../FrameElements/GitHub';
import Twitter from '../FrameElements/Twitter';
import Discord from '../FrameElements/Discord';
import Insta from '../FrameElements/Insta';
import logo from '../assets/BottomLeftLogo.png';
import guestBookIcon from '../assets/guestbook.png';


/** Footer for Main */
export default function Footer({openGuestBook, setGuestBook}) {
  return (
    <footer id="mainFooter">
      <div className="controlsButton">
      </div>
      <div className="logo">        
      </div>
      <div className="controlsButton">
        <Twitter />
        <Discord />
        <Insta />
        <GitHub />
      </div>
    </footer>
  )
}
