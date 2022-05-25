import React from 'react';
import { utils } from 'near-api-js';
import Buy from './Buy';


export default function Box({tokenId, gen, price, fontSettings, newAction}) {
  const priceInNear = utils.format.formatNearAmount(price);

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
    fontFamily: fontSettings.secondFamily,
    fontWeight: "700",
    fontSize: "14px",
    color: fontSettings.color,
    lineHeight: "17px",
    letterSpaceing: "0.05em",
    color: "#333333"
  };
  const valueStyle = {
    fontFamily: fontSettings.family,
    color: "#5D06C4",
    fontSize: "24px",
    lineHeight: "29px",
    letterSpacing: "0.05em",
    fontWeight: "bold"
  }


  return (
    <div id="splashSmallInfoBox" className="splashInfoElement">
      <div><p className="splashInfoElementFirst week2SplashSmallInfoBoxElement" style={labelStyle}>GENERATION</p></div>
      <div className="splashSmallInfoBoxNearPrice noFlexBasis"><p className="week2SplashSmallInfoBoxElement" style={valueStyle}>#{gen}</p></div>
      <div className="splashInfoElementBreak"></div>
      <div className="week2SplashSmallInfoBoxElement"><p style={labelStyle}>PRICE</p></div>
      <div className="splashSmallInfoBoxNearPrice noFlexBasis"><p className="week2SplashSmallInfoBoxElement" style={valueStyle}>{formatNumber(priceInNear,3)} NEAR</p></div>
      <div className="splashInfoElementBreak"></div>
      <Buy tokenId={tokenId} price={price} newAction={newAction} fontSettings={fontSettings} />
    </div>
  )
}
