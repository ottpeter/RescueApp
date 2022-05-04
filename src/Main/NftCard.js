import React from 'react';
import { utils } from 'near-api-js';


export default function NftCard({image, artistList, openTransfer, i, metadata}) {
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
  }, [])

  return (
    <>
    <button onClick={() => openTransfer(i)} className="nftCard">
      <img src={image} alt={'nft-image'}></img>
      <div className="nftCardInfo">
      <ul className="nftCardArtistList">
          {artistList.map((artist) => (
            <li className="nftCardArtistListElement">
              {artist.name}
            </li>
          ))}
        </ul>
        <div className="nftCardInfoTitleAndGen">
          <p>{metadata.title}</p>
          <p>#{extra.generation}</p>
        </div>
        <p className="nftCardInfoStatus">PURCHASED</p>
        <p className="nftCardInfoNearPrice">{formatNumber(priceInNear,3)} NEAR</p>
        <p className="nftCardInfoDollarPrice">~ ${formatNumber(priceInDollar,2)}</p>
      </div>
    </button>
    </>
  )
}
