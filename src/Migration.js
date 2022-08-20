import React from 'react'

export default function Migration({contractName}) {
  const [orig, setOrig] = React.useState("");
  const [from, setFrom] = React.useState(0);
  const [amount, setAmount] = React.useState(10);

  function migrationClicked() {
    console.log("Current orig: ", orig);

    const args = {
      from_index: from.toString(),
      amount: parseInt(amount),
      orig: orig
    }
    const gas = 300000000000000;
    window.contract.copy(args, gas)                                                            // This could be 'new' for user provided init, we are using default
      .then((msg) => console.log("Migration called! ", msg))
      .catch((err) => console.error(err));
  }


  return (
    <>
      <div>Migration</div>
      <label>Orig</label>
      <input type={"text"} value={orig} onChange={(e) => setOrig(e.target.value)} />
      <label>From: </label>
      <input type={"number"} value={from} onChange={(e) => setFrom(e.target.value)} />
      <label>Amount: </label>
      <input type={"number"} value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={migrationClicked}>{"Yeaaah I'm a button!! :) Click me!"}</button>
    </>
  );
}
