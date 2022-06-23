import React, { useState, useEffect, useCallback } from 'react'
import Draggable from 'react-draggable'
import MediaDropzone from '../Admin/MediaDropzone';

export default function ReactDraggableFont() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const [fontSize, setFontSize] = useState(14);
  const [fontColor, setFontColor] = useState("#000000");
  const [letterSpacing, setLetterSpacing] = useState("0.05");
  const [lineHeight, setLineHeight] = useState(17);

  const [tatuBoxStyle, setTatuBoxStyle] = useState({ border: "2px solid yellow", width: (width/4), height: (height/4) });


  const [image, setImage] = useState(null);

  const onDropMedia = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];                            // We can only accept 1 file
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);                           // Read as array buffer, because we need that for SHA256

    const base64Converter = new FileReader();
    base64Converter.readAsDataURL(file);
    base64Converter.onload = function(e) {
      if (file.type.includes("image")) {
        setImage({
          name: file.name,
          src: e.target.result,
        });
      }
    }

    reader.onload = async function () {                           // onload callback gets called after the reader reads the file data
      
    }
  });

  const experimentStyle = {
    width: "100vw",
    height: "100vh"
  }

  const helloBoxStyle = {
    border: "2px solid red",
    width: (width/4),
    height: (height/4)
  }

  useEffect(() => {
    setTatuBoxStyle(
      {
        border: "2px solid yellow",
        width: (width/4),
        height: (height/4),
        fontSize: `${fontSize}px`,
        letterSpacing: `${letterSpacing}em`,
        lineHeight: `${lineHeight}px`,
        color: fontColor,
      }
    ) 
  }, [fontSize, letterSpacing, lineHeight, fontColor]);

  const imageBoxStyle = {
    border: "2px solid purple",
    width: (width/4),
    height: (height/4),
    textAlign: "center",
  }

  const buyBoxStyle = {
    border: "2px solid orange",
    width: (width/4),
    height: (height/4),
    textAlign: "center",
  }

  const controlsStyle = {
    position: "absolute",
    width: "100%",
    height: "100px",
    bottom: 0,
    color: "white",
    backgroundColor: "#330033",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  }

  const sliderStyle = {
    width: "15vw",
  }

  const pInline = {
    display: "inline",
    marginLeft: "4px"
  }


  return (
    <div id='experimentBound' style={experimentStyle}>
      <Draggable grid={[(width/4),(height/4)]} bounds={"#experimentBound"}>
        <p style={helloBoxStyle}>Hello World! You can move me in a 4x4 grid.</p>
      </Draggable>

      <Draggable grid={[(width/4),(height/4)]} bounds={"#experimentBound"}>
        <p style={tatuBoxStyle}>t.A.T.u. released the albums Dangerous and Moving and Lyudi Invalidy in 2005 to moderate success after parting ways with Shapovalov. The former was promoted with the international hit "All About Us". The duo ventured into other projects, such as creating their own production company T.A. Music and promoting the film inspired by their story, You and I (2008). Their last pair of albums, Vesyolye Ulybki and Waste Management, followed between 2008 and 2009, respectively. t.A.T.u. officially broke up in 2011, with Katina and Volkova pursuing solo careers.</p>
      </Draggable>

      <Draggable bounds={"#experimentBound"}>
        <div style={imageBoxStyle}>
          {image ? 
            <img src={image.src} style={{maxWidth: "100%", maxHeight: "100%"}} />
          : 
            <div>
              <MediaDropzone onDrop={(files) => onDropMedia(files)} accept={"image/*"} />
              <p>This box is not aligning to a grid.</p>
            </div>
          }
        </div>
      </Draggable>

      <Draggable grid={[(width/4),(height/4)]} bounds={"#experimentBound"}>
        <div style={buyBoxStyle}>
          <button onClick={() => window.alert("Buy clicked.")}>Buy</button>
        </div>
      </Draggable>


      <div style={controlsStyle}>
        <p>Font settings</p>

        <div>
          <label>Size</label>
          <input type={"range"} min={1} max={30} style={sliderStyle} value={fontSize} onChange={(e) => setFontSize(e.target.value)}></input>
          <p style={pInline}>{fontSize}px</p>
        </div>

        <div>
          <label>LineHeight</label>
          <input type={"range"} min={1} max={50} style={sliderStyle} value={lineHeight} onChange={(e) => setLineHeight(e.target.value)}></input>
          <p style={pInline}>{lineHeight}px</p>
        </div>

        <div>
          <label>Color</label>
          <input type={"color"} value={fontColor} onChange={(e) => setFontColor(e.target.value)}></input>
          <p style={pInline}>{fontColor}</p>
        </div>

        <div>
          <label>LetterSpacing</label>
          <input type={"range"} min={0.01} max={1} step={0.01} style={sliderStyle} value={letterSpacing} onChange={(e) => setLetterSpacing(e.target.value)}></input>
          <p style={pInline}>{letterSpacing}em</p>
        </div>

        <div></div>

      </div>
    </div>
  )
}
