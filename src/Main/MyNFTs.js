import React, { useEffect, useState } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import TopMenu from './TopMenu';
import { getListForAccount, verify_sha256 } from '../utils';
import NftCard from './NftCard';
import TransferModal from './TransferModal';
import svgBackground from '../assets/splash1svg.svg';


export default function MyNFTs({newAction, openGuestBook, setGuestBook, setShowWallet, showWallet}) {
  const [list, setList] = useState([]);
  const [images, setImages] = useState(Array(100).fill(null));
  const [showTransfer, setShowTransfer] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(async () => {
    const urlParams = window.location.search;
    if (urlParams.includes('errorCode')) {
      newAction({
        errorMsg: "There was an error while processing the transaction!", errorMsgDesc: "errorCode",
      }); 
    } else if (urlParams.includes('transactionHashes')) {
      newAction({
        successMsg: "NFT transfered!", successMsgDesc: "You successfully transfered the NFT!",
      });
    }

    const nftList = await getListForAccount();
    console.log("nftList", nftList)
    setList(nftList);
    loadImages(nftList);
  }, []);

  function loadImages(nftList) {
    for (let i = 0; i < nftList.length; i++) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", "https://ipfs.io/ipfs/" + nftList[i].metadata.media);
      xhr.responseType = "blob";
      xhr.onload = function() {
        let blob = xhr.response;
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = async function(e) {
          const hash_correct = await verify_sha256(blob, nftList[i].metadata.media_hash);
          if (hash_correct) setImages((state) => {
            state[i] = e.target.result;
            return [...state];
          });
          else newAction({
            errorMsg: "There was an error while loading the image!", errorMsgDesc: "The image hash is incorrect.",
          });
        }
      }
      xhr.send();
    }
  }

  function openTransfer(index) {
    setSelected(index);
    setShowTransfer(true);
  }

  function getArtistIndex(tokenId) {
    console.log("tokenId inside getArtistIndex: ", tokenId);

    /** We will manually need to update this list throughout the SoundSplash */
    if (tokenId.includes('fono-root-0-') || tokenId === 'fono-root-0') return 2;
    if (tokenId.includes('fono-root-2-') || tokenId === 'fono-root-2') return 0;
    if (tokenId.includes('fono-root-3-') || tokenId === 'fono-root-3') return 1;
    if (tokenId.includes('fono-root-4-') || tokenId === 'fono-root-4') return 3;
    return 0;
  }

  return (
    <>
      {openGuestBook && ( <GuestBook openModal={openGuestBook} newAction={newAction} setOpenModal={setGuestBook} /> )}
      <ToastContainer hideProgressBar={true} position="bottom-right" transition={Slide} />
      
      <div id='colorContainer'>
        <div id='svgContainer' style={{ backgroundImage: `url(${svgBackground})` }}>
          <TopMenu setShowWallet={setShowWallet} showWallet={showWallet} />

          <main>
            <h1>MY NFTs</h1>
            <ul id="listContainer">
              {list && list.map((item, i) => (
                <li key={"nftCard-" + i}>
                  <NftCard 
                    image={images[i]} 
                    artistList={artistLists[getArtistIndex(item.token_id)]}
                    openTransfer={openTransfer} 
                    i={i} metadata={item.metadata} 
                  />
                </li>
              ))}
            </ul>
            

            {showTransfer && 
              <TransferModal 
                token={list[selected]} 
                artistList={artistLists[getArtistIndex(list[selected].token_id)]}
                newAction={newAction} 
                setOpenModal={setShowTransfer}
              />
            }
            
            <Footer />
          </main>
        </div>
      </div>

    </>
  );
}

const artistLists = [
  [
    {
      name: "masia one ",
      twitter: "https://twitter.com/masiaone",
      insta: "https://www.instagram.com/masiaone/",
      youtube: "testYT"
    },
    {
      name: "noyz134",
      twitter: "https://twitter.com/chew_wui",
      insta: "http://www.instagram.com/noyz134",
      youtube: "otherYT"
    },
    {
      name: "janine annice",
      twitter: "https://twitter.com/JanineAnnice",
      insta: "http://www.instagram.com/janineannice",
      youtube: "otherYT"
    },
    {
      name: "alx",
      twitter: "https://twitter.com/alxtalhinhas",
      insta: "http://www.instagram.com/alxtalhinhas",
      youtube: "otherYT"
    },
    {
      name: "jcb",
      twitter: "https://twitter.com/JCBBeats",
      insta: "http://www.instagram.com/JustinCBurkholder",
      youtube: "otherYT"
    },
  ],
  [
    {
      name: "DEDEUKWU",
      twitter: "https://twitter.com/_dedeukwu/status/1493308920676466697?s=21&t=xd4BJufPNKs2CxsiOizdew",
      insta: "https://www.instagram.com/p/CbLxPYbIohY/?utm_medium=copy_link",
      youtube: "https://youtu.be/Sk6oNlDtGec"
    },
  ],
  [
    {
      name: "vandal",
      twitter: "https://twitter.com",
      insta: "https://instagram.com"
    }
  ],
  [
    {
      name: "mantravine",
      facebook: "https://www.facebook.com/Mantravine/",
      twitter: "https://twitter.com/mantravine",
      insta: "https://www.instagram.com/mantravine/",
      youtube: "https://www.youtube.com/user/mantravine",
      tiktok: "https://www.tiktok.com/@mantravine"
    },
  ]
];