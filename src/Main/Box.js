import React from 'react';
import { utils } from 'near-api-js';
import Buy from './Buy';


export default function Box({tokenId, gen, price, fontSettings, newAction}) {
  const priceInNear = utils.format.formatNearAmount(price);
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
  
  const labelStyle = {
    fontFamily: fontSettings.family,
    fontSize: fontSettings.normalSize,
    fontSize: "12px",
    lineHeight: "14px",
    letterSpaceing: "0.05em",
  };
  const valueStyle = {
    fontFamily: fontSettings.family,
    fontSize: "24px",
    lineHeight: "29px",
    letterSpacing: "0.05em",
    fontWeight: "bold"
  }


  return (
    <div id="splashSmallInfoBox" className="splashInfoElement">
      <p className="splashInfoElementFirst splashSmallInfoBoxElement" style={labelStyle}>GENERATION</p>
      <p className="splashInfoElementSecond splashSmallInfoBoxElement" style={valueStyle}>#{gen}</p>
      <p className="splashSmallInfoBoxNearPrice splashSmallInfoBoxElement" style={valueStyle}>{formatNumber(priceInNear,3)} NEAR</p>
      <Buy tokenId={tokenId} price={price} newAction={newAction} fontSettings={fontSettings} />
    </div>
  )
}
