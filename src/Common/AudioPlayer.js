import React from 'react';


export default function AudioPlayer({music}) {
  const playerRef = React.useRef();
  const timeoutId = setTimeout(timeoutFunc, 500);
  const [time, setTime] = React.useState("0");
  const [playing, setPlaying] = React.useState(false);
  
  function timeoutFunc() {
    setTime(playerRef.current.currentTime);
  }
  
  React.useEffect(async () => {
    playerRef.current.volume = 0.50;
    return () => {
      clearTimeout(timeoutId)
    };
  }, [playing]);

  function playClicked() {
    setPlaying(true);
    playerRef.current.play();
  }

  function pauseClicked() {
    setPlaying(false);
    playerRef.current.pause();
  }

  function decreaseVolume() {
    if (playerRef.current.volume === 0) return;
    playerRef.current.volume = (playerRef.current.volume -0.10).toFixed(2);
    console.log("volume: ", playerRef.current.volume);
  }

  function addVolume() {
    if (playerRef.current.volume === 1) return;
    playerRef.current.volume = (playerRef.current.volume +0.10).toFixed(2);
    console.log("volume: ", playerRef.current.volume);
  }

  return (
    <>
      <audio style={{ display: "block" }} src={music} ref={playerRef} />
      {playing? 
        <button className="musicControlsButton" onClick={pauseClicked}><PauseIcon /></button>
      : 
        <button className="musicControlsButton" onClick={playClicked}><PlayIcon /></button>
      }
      {playerRef.current && 
        <input 
          className="musicControlsSlider"
          type={"range"}
          min={"0"}
          max={playerRef.current.duration}
          value={time}
          onChange={(e) => {
            playerRef.current.currentTime = e.target.value;
            setTime(playerRef.current.currentTime);
          }}
        />
      }
      <button className="musicControlsButton" onClick={decreaseVolume}><VolumeMinus /></button>
      <VolumeEmpty />
      <button className="musicControlsButton" onClick={addVolume}><VolumePlus /></button>
    </>
  );
}


/** 
 * We used to have a problem with SVG loading
 * The path for the image asset became something like `https://ipfs.io/ipfs/volume.72f0adf8.svg` instead of something like 
 * `https://ipfs.io/ipfs/QmaFoGKANeVtwoYbdW3E7NB2wgLnmjXVJCoN7Xen4tJiYG/volume.72f0adf8.svg`. We don't have this problem in the footer.
 * After renaming `pause.svg` to `Pause.svg`, all of the problems got solved in an unexplainable way, but we do it with inline SVG for safety reasons.
 */
function PlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6 20H8.43757V19.2H9.65827V18.4H10.877V17.6H12.0958V16.8H13.3146V16H14.5333V15.2H15.7501V14.4H16.9689V13.6H18.1896V12.8H19.0021V11.2H18.1896V10.4H16.9689V9.6H15.7501V8.8H14.5333V8H13.3146V7.2H12.0958V6.4H10.877V5.6H9.65827V4.8H8.43757V4H6V20Z" fill="#333333"/>
      <rect width="2" height="2" transform="matrix(1 0 0 -1 11 13)" fill="#333333"/>
    </svg>
  );
}

function PauseIcon() {
  return(
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10 4H5V20H10V4ZM19 4H14V20H19V4Z" fill="#333333"/>
    </svg>
  );
}

function VolumeEmpty() {
  return(
    <svg width="20" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0H10V20H8V18H6V16H8V4H6V2H8V0ZM4 6V4H6V6H4ZM2 8H4V6H2H0V8V12V14H2H4V16H6V14H4V12H2V8Z" fill="#333333"/>
    </svg>
  );
}

function VolumeMinus() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="8" height="2" fill="#333333"/>
    </svg>
  );
}

function VolumePlus() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3 5V8H5V5H8V3H5V0H3V3H0V5H3Z" fill="#333333"/>
    </svg>
  );
}