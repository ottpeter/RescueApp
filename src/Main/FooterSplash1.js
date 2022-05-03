import React from 'react';
import DaoLogo from '../assets/DaoLogo.svg';
import RealityChain from '../assets/RealityChainLogo.svg';
import CryptoVoxels from '../assets/CryptoVoxelsLogo.svg';


/** Footer for Main */
export default function FooterSplash1() {
  return (
    <footer id="splash-1-Footer">
      <ul>
        <li>
          <a href={'https://www.daorecords.org/'}>
            <img src={DaoLogo} alt={'DAOrecords'} />
          </a>
        </li>
        <li>
          <a href={'https://duckduckgo.com'} >
            <img src={RealityChain} alt={'RealityChain'} />
          </a>
        </li>
        <li>
          <a href={'http://bit.ly/SoundSplashSpace'}>
            <img src={CryptoVoxels} alt={'CryptoVoxels'} />
          </a>
        </li>
      </ul>
    </footer>
  )
}
