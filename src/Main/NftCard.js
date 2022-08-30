import React from 'react';
import { utils } from 'near-api-js';
import nearLogo from '../assets/ic_near.svg';
import placeholder from '../assets/DaoLogo.svg';
import playIcon from '../assets/play.svg';


export default function NftCard({playClicked, artistList, openTransfer, index, metadata}) {
  const extra = JSON.parse(metadata.extra);
  const priceInNear = utils.format.formatNearAmount(extra.original_price);
  const [priceInDollar, setDollar] = React.useState("NaN");

  function formatNumber(number, maxDecimal) {
    return Math.round(number * Math.pow(10,maxDecimal)) / Math.pow(10,maxDecimal)
  }

  React.useEffect(async () => {
    const nearPrice = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=NEARUSDT")
    .then((res) => res.json())
    .catch((err) => {
      console.error("Error while fetching NEAR price", err);
      return { price: 0 }
    });
    const dResult = nearPrice.price * priceInNear;
    setDollar(dResult);
  }, []);


  return (
    <>
      <button onClick={() => openTransfer(index)} className="nftCard">
        <div className="nftCardImageContainer">
          <img src={`https://daorecords.io:8443/fetch?cid=${metadata.media}`} alt={'nft-image'}></img>
          <img src={playIcon} alt={'P'} className="nftCardPlay" onClick={(e) => playClicked(index, e)}></img>
        </div>
        <div className="nftCardInfo">
          <p className="nftCardInfoTitle">
            {metadata.title}
          </p>
          <ul className="nftCardArtistList">
            {artistList.map((artist, i) => (
              <li key={"artist-" + i} className="nftCardArtistListElement">
                <img src={placeholder} alt={''}></img>
                <p>@{artist.name}</p>
              </li>
            ))}
          </ul>
          <div className="nftCardInfoBox">
            <p className="nftCardGen">Gen #{extra.generation}</p>
            <p className="nftCardNearPrice">{formatNumber(priceInNear,3)}</p>
            <img src={nearLogo} alt={'N'}></img>
          </div>
          <div className="nftCardButtons">
            <button className="nftCardSecondaryButton">Stake</button>
            <button className="nftCardPrimaryButton">Buy</button>
          </div>
        </div>
      </button>
    </>
  )
}
