import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { buyNFTfromVault, verify_sha256 } from '../utils';
import close from '../assets/close.svg';
import AudioPlayer from '../Common/AudioPlayer';


export default function TokenModal({id, metadata, image, newAction, setOpenModal}) {
  const [music, setMusic] = useState(null);
  const extra = JSON.parse(metadata.extra);

  function buyNFT() {
    const buyPromise = new Promise(async (resolve, reject) => {
      const buyResult = await buyNFTfromVault(id, extra.original_price);
      if (buyResult) {
        resolve("Buying the NFT was successul (message from promise)");
      } else {
        reject("Buying the NFT was not successul (message from promise)");
      }
    });
    newAction({
      thePromise: buyPromise, 
      pendingPromiseTitle: "Prepairing transaction...", pendingPromiseDesc: "plase wait",
      successPromiseTitle: "Redirecting to transaction", successPromiseDesc: "Please sign the transaction in the next screen!",
      errorPromiseTitle: "Redirecting to transaction", errorPromiseDesc: "Please sign the transaction in the next screen!"
    });
  }

  function loadMusic() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://ipfs.io/ipfs/" + extra.music_cid);
    xhr.responseType = "blob";
    xhr.onload = function() {
      let blob = xhr.response;
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = async function(e) {
        const hash_correct = await verify_sha256(blob, extra.music_hash);
        if (hash_correct) setMusic(e.target.result);
        else newAction({
          errorMsg: "There was an error while loading the music!", errorMsgDesc: "The music hash is incorrect.",
        });
      }
    }
    xhr.send();
  }

  loadMusic();

 
  return (
    <div className="nftDetailsModal" >
        <p className="nftDetailsModalItem">{metadata.title}</p>
        <img className="nftDetailsModalItem" src={image} alt={metadata.title}></img>
        <p className="nftDetailsModalItem">{metadata.description}</p>
        
        
        <div className="nftDetailsModalItem nftDetailsModalAudioPlayer">
          {music ? 
            <AudioPlayer music={music} />
          :
            <p className="loadingLabel">loading music... </p>
          }
        </div>
        
        <button className="nftDetailsModalItem" onClick={buyNFT} id="nftBuyButton"></button>          
    </div>
  );
}
