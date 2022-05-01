import React from 'react';
import DaoLogo from '../assets/DaoLogo.png';
import RealityChain from '../assets/RealityChainLogo.png';
import CryptoVoxels from '../assets/CryptoVoxelsLogo.png';


/** Footer for Main */
export default function FooterSplash1() {
  return (
    <footer id="splash-1-Footer">
      <ul>
        <li>
          <a href={'https://duckduckgo.com'}>
            <img src={DaoLogo} alt={'DAOrecords'} />
          </a>
        </li>
        <li>
          <a href={'https://duckduckgo.com'} >
            <img src={RealityChain} alt={'RealityChain'} />
          </a>
        </li>
        <li>
          <a href={'https://duckduckgo.com'}>
            <img src={CryptoVoxels} alt={'CryptoVoxels'} />
          </a>
        </li>
      </ul>
    </footer>
  )
}
