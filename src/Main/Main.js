import React, { useState, useRef } from 'react';
import { getBuyableTokens, verify_sha256 } from '../utils';
import 'regenerator-runtime/runtime';
import countriesGeo from "../assets/countries.json";
import TokenModal from './TokenModal';
import clickSoundOne from '../assets/click.mp3';
import sampleVideo from '../assets/sampleVideo.mp4'


export default function Main({newAction}) {
  const [nftList, setNftList] = React.useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [image, setImage] = useState(null);

  
  const coordList = [
    [-20.1619400, 57.4988900, "Port Louis", 0],
    [43.6529, -79.3849, "Toronto", 1],
    [49.2609, -123.1139, "Vancouver", 2],
    [-6.173292, 106.841036, "Jakarta", 3],
    [1.351616, 103.808053, "Singapore", 4],
    [13.75, 100.51667, "Bangkok", 5],
    [22.346578, 114.135442, "Hong Kong", 6],
    [3.1412000, 101.6865300, "Kuala Lumpur", 7],
    [12.97194, 77.59369, "Bangalore", 8],
    [39.905, 116.39139, "Beijing", 9],
    [51.50722, -0.1275, "London", 10],
    [47.90771, 106.88324, "Ulaanbaatar", 11],
    [-18.91368, 47.53613, "Antananarivo", 12]
  ];
  const coordListObjs = coordList.map((entry) => ({
    lat: entry[0],
    lng: entry[1],
    city: entry[2],
    index: entry[3]
  }))
  

  React.useEffect(async () => {    
    const urlParams = window.location.search;
    if (urlParams.includes('errorCode')) {
      newAction({
        errorMsg: "There was an error while processing the transaction!", errorMsgDesc: URLSearchParams.get('errorCode'),
      }); 
    } else if (urlParams.includes('transactionHashes')) {
      newAction({
        successMsg: "Success!", successMsgDesc: "You bought a new NFT!",
      });
    }

    const buyable = await getBuyableTokens();
    const orderedBuyable = buyable.sort(function(a, b) {
      const firstNum = a.token_id.slice(10, a.token_id.lastIndexOf("-"));
      const secondNum = b.token_id.slice(10, b.token_id.lastIndexOf("-"));
      return firstNum - secondNum;
    })
  // FAKE
  const fakeList = [...orderedBuyable, ...orderedBuyable, ...orderedBuyable];
    setNftList(fakeList);
  }, [])

  async function nftClicked(nftIndex) {
    //if (openModal) {
     // setOpenModal(false);
   // }
    //clickSound.play();
    setSelectedNFT(nftIndex);
    //changeCenter(coordList[nftIndex]);
    loadImage(nftList[nftIndex].metadata);
    setOpenModal(true);
    //setTimeout(() => setOpenModal(true), transitionMs);
  }

  // We are prefetching the image for faster loading
  function loadImage(metadata) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://ipfs.io/ipfs/" + metadata.media);
    xhr.responseType = "blob";
    xhr.onload = function() {
      let blob = xhr.response;
      const reader = new FileReader();
      const verifier = new FileReader();
      reader.readAsDataURL(blob);
      
      reader.onload = async function(e) {
        const hash_correct = await verify_sha256(blob, metadata.media_hash);
        if (hash_correct) setImage(e.target.result);
        else newAction({
          errorMsg: "There was an error while loading the image!", errorMsgDesc: "The image hash is incorrect.",
        }); 
      }
    }
    xhr.send();
  }

  function generateRandomColors() {
    let tempColors = [];
    for (let i = 0; i < countriesGeo.features.length; i++) {
      tempColors[i] = Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0');
    }
    return tempColors;
  }


  return (
    <main>
      {openModal && (
        <TokenModal 
          key={selectedNFT}
          id={nftList[selectedNFT].token_id}
          metadata={nftList[selectedNFT].metadata}
          image={image}
          newAction={newAction}
          setOpenModal={setOpenModal}
        />
      )}

      <div id="backgroundContainer">
        <video autoplay={"autoplay"} loop={"loop"} width={"100%"} src={sampleVideo}></video>
        <div id="leftList">
            {nftList.map((nft, i) => {
              const rightStart = "80%";
              const circleWidth = "200px";
              const marginWidth = "32px";
              const cssPos = {
                top: "50%",
                right: `calc(${rightStart} + ${i} * (${circleWidth} + ${marginWidth}))`,
              }
              return (
                <div className="nftCircle" onClick={() => nftClicked(i)} style={cssPos}>
                  {nft.metadata.title}
                </div>
            )})}
        </div>
        <div id="rightList">
          {nftList.map((nft, i) => {
            const leftStart = "80%";
            const circleWidth = "200px";
            const marginWidth = "32px";
            const cssPos = {
              top: "50%", 
              left: `calc(${leftStart} + ${i} * (${circleWidth} + ${marginWidth}))`,
            }
            return (
              <div className="nftCircle" onClick={() => nftClicked(i)} style={cssPos}>
                {nft.metadata.title}
              </div>
          )})}
        </div>

      </div>
      


    </main>
  )
}