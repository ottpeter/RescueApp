import React, { useEffect, useState } from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import TopMenu from './TopMenu';
import { getListForAccount, verify_sha256 } from '../utils';
import NftCard from './NftCard';
import svgBackground from '../assets/splash1svg.svg';
import artistLists from '../artistLists.json';
import { useNavigate } from 'react-router-dom';


export default function MyNFTs({newAction, openGuestBook, setGuestBook, setShowWallet, showWallet}) {
  const [list, setList] = useState([]);
  let navigate = useNavigate();

  useEffect(async () => {
    const nftList = await getListForAccount();
    console.log("nftList", nftList);
    setList(nftList);
  }, []);

  function openTransfer(tokenId) {
    navigate('/nfts/' + tokenId);
  }

  function getArtistIndex(tokenId) {
    console.log("tokenId inside getArtistIndex: ", tokenId);

    /** We will manually need to update this list throughout the SoundSplash */
    if (tokenId.includes('fono-root-0-') || tokenId === 'fono-root-0') return 2;
    if (tokenId.includes('fono-root-2-') || tokenId === 'fono-root-2') return 0;
    if (tokenId.includes('fono-root-3-') || tokenId === 'fono-root-3') return 1;
    if (tokenId.includes('fono-root-4-') || tokenId === 'fono-root-4') return 3;
    if (tokenId.includes('fono-root-5-') || tokenId === 'fono-root-5') return 4;
    if (tokenId.includes('fono-root-6-') || tokenId === 'fono-root-6') return 5;
    if (tokenId.includes('fono-root-7-') || tokenId === 'fono-root-7') return 6;
    if (tokenId.includes('fono-root-8-') || tokenId === 'fono-root-8') return 7;
    if (tokenId.includes('fono-root-9-') || tokenId === 'fono-root-9') return 8;
    if (tokenId.includes('fono-root-10-') || tokenId === 'fono-root-10') return 9;
    return 10;
  }


  return (
    <>
      {openGuestBook && ( <GuestBook openModal={openGuestBook} newAction={newAction} setOpenModal={setGuestBook} /> )}
      <ToastContainer hideProgressBar={true} position="bottom-right" transition={Slide} />
      
      <div id='colorContainer'>
        <div id='svgContainer' style={{ backgroundImage: `url(${svgBackground})` }}>
          <TopMenu setShowWallet={setShowWallet} showWallet={showWallet} />

          <main style={{ overflowY: "scroll"}}>
            {list ? 
              <>
                <h1>MY NFTs</h1>
                <ul id="listContainer">
                  {list && list.map((item, i) => (
                    <li key={"nftCard-" + i}>
                      <NftCard 
                        artistList={artistLists[getArtistIndex(item.token_id)]}
                        openTransfer={() => openTransfer(item.token_id)} 
                        i={i} metadata={item.metadata} 
                      />
                    </li>
                  ))}
                </ul>
              </>
            :
              <h1>You don't have any NFTs yet!</h1>
            }
            
            <Footer />
          </main>
        </div>
      </div>

    </>
  );
}