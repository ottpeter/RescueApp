import React from 'react';
import DaoLogo from '../assets/DaoLogo.svg';
import RealityChain from '../assets/RealityChainLogo.svg';
import CryptoVoxels from '../assets/CryptoVoxelsLogo.svg';


/** Footer for Main */
export default function FooterSplash1() {
  return (
    <footer>
      <ul>
        <li>
          <a href={'https://www.daorecords.org/'}>
            Daorecords.org
          </a>
        </li>
        <li>
          <a href={'https://near.realitychain.io/2dcity/index.html?pos=x-192y-32s'} >
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
