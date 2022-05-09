import React from 'react';


export default function AudioPlayerNftStorage({nftStorageLink}) {
  /** We are not using `music` anymore, because we are inserting the URL inside src instead.
   * This way, the admin page music player probably wont work */
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
      <audio style={{ display: "block" }} src={nftStorageLink} ref={playerRef} />
      {playing? 
        <button className="musicControlsButton" onClick={pauseClicked}><PauseIcon /></button>
      : 
        <button className="musicControlsButton" onClick={playClicked}><PlayIcon /></button>
      }
      {playerRef.current && 
        <input 
          className="musicControlsSlider musicControlsSliderWhite"
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
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.25 18.75L42.75 30L23.25 41.25V18.75Z" fill="#F2F2F2"/>
      <circle cx="30" cy="30" r="29.5" stroke="#F2F2F2"/>
    </svg>
  );
}

function PauseIcon() {
  return(
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 16H26V44H20V16Z" fill="#F2F2F2"/>
      <path d="M34 16H40V44H34V16Z" fill="#F2F2F2"/>
      <circle cx="30" cy="30" r="29.5" stroke="#F2F2F2"/>
    </svg>
  );
}