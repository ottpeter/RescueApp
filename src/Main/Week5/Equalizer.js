import React, { useEffect, useRef, useState } from 'react';


function LineVisualizer ({musicCID, play}) {
  const canvasRef = useRef(null);
  const [canvasContext, setCanvasContext] = useState(null);
  
  let audio = new Audio(`https://daorecords.io:8443/fetch?cid=${musicCID}`);
  audio.crossOrigin = "anonymous";                              // Without this, we would have CORS-error
  audio.load();
  const audioContext = new AudioContext();
  console.log(audioContext);

  useEffect(() => {
    if (!canvasRef.current) return;
    console.log("canvasRef ", canvasRef);
    const canvas = canvasRef.current;
    setCanvasContext(canvas.getContext('2d'));
  }, []);

  useEffect(() => {
    if (play) experiment();
    console.log("play", play)
    // otherwise stop
  }, [play])

  
  function connectVisualizer() {
    audio.play();
    
    let canvas = canvasRef.current;
    let audioSource = audioContext.createMediaElementSource(audio);
    let analyzer = audioContext.createAnalyser();
    audioSource.connect(analyzer);
    analyzer.connect(audioContext.destination);
    analyzer.fftSize = 256;                                     // Column number
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
  
    const barWidth = (canvas.width/2)/bufferLength;

    return [canvas, analyzer, bufferLength, dataArray, barWidth];
  }

  function experiment() {
      if (canvasContext) {
        const [canvas, analyzer, bufferLength, dataArray, barWidth] = connectVisualizer();
        
        function animate() {
          let fromLeft = 0;
          canvasContext.clearRect(0, 0, canvas.width, canvas.height);
          analyzer.getByteFrequencyData(dataArray);

          // Left side
          for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i] * 0.9;                // Never hit the top of the canvas
            
            const red = i * barHeight/20;                        // We calculate colors based on the music
            const green = i * 4;                                 // and space-from-left
            const blue = barHeight / 2;
            
            canvasContext.fillStyle = `rgba(${red}, ${green}, ${blue}, 0.5)`
            canvasContext.fillRect((canvas.width/2) - fromLeft, canvas.height - barHeight, barWidth, barHeight);
            fromLeft = fromLeft + barWidth
          }
          // Right side
          for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i] * 0.9;                // Never hit the top of the canvas
            
            const red = i * barHeight/20;                        // We calculate colors based on the music
            const green = i * 4;                                 // and space-from-left
            const blue = barHeight / 2;
            
            canvasContext.fillStyle = `rgba(${red}, ${green}, ${blue}, 0.5)`
            canvasContext.fillRect(fromLeft + barWidth, canvas.height - barHeight, barWidth, barHeight);
            fromLeft = fromLeft + barWidth
          }

          requestAnimationFrame(animate);
        }
        animate();
      }
  }

  return (
      <div id='testContainer' style={{  position: "absolute", zIndex: "5000"  }}>
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />
      </div>
  );
}

export default LineVisualizer;