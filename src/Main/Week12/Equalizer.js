import React, { useEffect, useRef, useState } from 'react';


function LineVisualizer ({musicCID, play}) {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [canvasContext, setCanvasContext] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const alpha = "1.0";


  useEffect(() => {
    if (!canvasRef.current || !audioRef.current) return;
    console.log("canvasRef ", canvasRef);
    const canvas = canvasRef.current;
    setCanvasContext(canvas.getContext('2d'));

    console.log("audioRef: ", audioRef);
    const audio = audioRef.current;
    audio.crossOrigin = "anonymous";                              // Without this, we would have CORS-error
    audio.load();
    audio.volume = 0.5;
  }, []);
  
  useEffect(() => {
    console.log("play", play)
    if (play) startPlaying();
    if (!play) stopPlaying();
  }, [play])

  
  function connectVisualizer() {
    console.log("Connecting visualizer...")
    audioRef.current.play();

    const audioCtx = new AudioContext();
    setAudioContext(audioCtx);
    console.log(audioContext);
    
    let canvas = canvasRef.current;
    let audioSource = audioCtx.createMediaElementSource(audioRef.current);
    let analyzer = audioCtx.createAnalyser();
    audioSource.connect(analyzer);
    analyzer.connect(audioCtx.destination);
    analyzer.fftSize = 256;                                     // Column number
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
  
    const barWidth = (canvas.width/2)/bufferLength;

    return [canvas, analyzer, bufferLength, dataArray, barWidth];
  }

  function startPlaying() {
    if (audioContext) {                                         // This will happen when the user pauses -> restarts the audio
      audioRef.current.play();
      return;
    }

    if (canvasContext) {
      const [canvas, analyzer, bufferLength, dataArray, barWidth] = connectVisualizer();
      
      function animate() {
        let fromLeft = 0;
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        analyzer.getByteFrequencyData(dataArray);
        //console.log(dataArray)

        // Left side
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i] * 0.9;                // Never hit the top of the canvas
          
          const red = i * barHeight/20;                        // We calculate colors based on the music
          const green = i * 4;                                 // and space-from-left
          const blue = barHeight / 2;
          //console.log(`red: ${red}  green: ${green}  blue: ${blue}`);
          
          canvasContext.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`
          canvasContext.fillRect((canvas.width/2) - fromLeft, (canvas.height/2) - barHeight, barWidth, barHeight);
          canvasContext.fillRect((canvas.width/2) - fromLeft, (canvas.height/2), barWidth, barHeight);
          fromLeft = fromLeft + barWidth
        }
        // Right side
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i] * 0.9;                // Never hit the top of the canvas
          
          const red = i * barHeight/20;                        // We calculate colors based on the music
          const green = i * 4;                                 // and space-from-left
          const blue = barHeight / 2;
          
          canvasContext.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`
          canvasContext.fillRect(fromLeft + barWidth, (canvas.height/2) - barHeight, barWidth, barHeight);
          canvasContext.fillRect(fromLeft + barWidth, (canvas.height/2), barWidth, barHeight);
          fromLeft = fromLeft + barWidth;
        }

        requestAnimationFrame(animate);
      }
      animate();
    }
  }

  function stopPlaying() {
    console.log("stopPlaying...")
    audioRef.current.pause();
  }


  return (
    <>
      <canvas id="lineVisualizer" ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />
      <audio ref={audioRef} src={`https://daorecords.io:8443/fetch?cid=${musicCID}`} />
    </>
  );
}

export default LineVisualizer;