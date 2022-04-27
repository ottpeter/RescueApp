import React from 'react';
import { utils } from 'near-api-js';


export default function Box({gen, price, fontSettings}) {
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
    console.log("dResult: ", dResult)
    setDollar(dResult);
  }, [])
  
  const labelStyle = {
    fontFamily: fontSettings.family,
    fontSize: fontSettings.normalSize,
  };
  const valueStyle = {
    fontFamily: fontSettings.family,
    fontSize: fontSettings.normalSize,
    fontWeight: "bold"
  }


  return (
    <div id="splashSmallInfoBox" className="splashInfoElement">
      <p className="splashInfoElementFirst" style={labelStyle}>GEN</p>
      <p className="splashInfoElementSecond" style={valueStyle}>#{gen}</p>
      <p className="splashInfoElementThird" style={labelStyle}>PRICE</p>
      <div className="splashInfoElementFourth" style={valueStyle}>
        <p className="splashSmallInfoBoxNearPrice">{formatNumber(priceInNear,3)} NEAR</p>
        <p className="splashSmallInfoBoxDollarPrice">~ ${formatNumber(priceInDollar,2)}</p>
      </div>
    </div>
  )
}
