import React, { useState, useCallback } from 'react'
import Draggable from 'react-draggable'
import MediaDropzone from '../Admin/MediaDropzone';

export default function ReactDraggableGridSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const [gridDivisor, setGridDivisor] = useState(4);
  
  const [tatuXCell, setTatuXCell] = useState(1);
  const [tatuYCell, setTatuYCell] = useState(1);
  const [helloXCell, setHelloXCell] = useState(1);
  const [helloYCell, setHelloYCell] = useState(1);
  const [imageXCell, setImageXCell] = useState(1);
  const [imageYCell, setImageYCell] = useState(1);

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
    width: ((width/gridDivisor) * helloXCell),
    height: ((height/gridDivisor) * helloYCell)
  }

  const tatuBoxStyle = {
    border: "2px solid yellow",
    width: ((width/gridDivisor) * tatuXCell),
    height: ((height/gridDivisor) * tatuYCell),
  }

  const imageBoxStyle = {
    border: "2px solid purple",
    width: ((width/gridDivisor) * imageXCell),
    height: ((height/gridDivisor) * imageYCell),
    textAlign: "center",
  }

  const buyBoxStyle = {
    border: "2px solid orange",
    width: (width/gridDivisor),
    height: (height/gridDivisor),
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
      <Draggable grid={[(width/gridDivisor),(height/gridDivisor)]} bounds={"#experimentBound"}>
        <div style={helloBoxStyle}>
          <p>{`Hello World! You can move me in a ${gridDivisor}x${gridDivisor} grid.`}</p>
          <p>GridDivisor is the number of columns and rows.</p>
          <p>The other sliders are setting the width and height of the boxes, 1 unit is 1 column/row.</p>
        </div>
      </Draggable>

      <Draggable grid={[(width/gridDivisor),(height/gridDivisor)]} bounds={"#experimentBound"}>
        <p style={tatuBoxStyle}>t.A.T.u. released the albums Dangerous and Moving and Lyudi Invalidy in 2005 to moderate success after parting ways with Shapovalov. The former was promoted with the international hit "All About Us". The duo ventured into other projects, such as creating their own production company T.A. Music and promoting the film inspired by their story, You and I (2008). Their last pair of albums, Vesyolye Ulybki and Waste Management, followed between 2008 and 2009, respectively. t.A.T.u. officially broke up in 2011, with Katina and Volkova pursuing solo careers.</p>
      </Draggable>

      <Draggable grid={[(width/gridDivisor),(height/gridDivisor)]} bounds={"#experimentBound"}>
        <div style={imageBoxStyle}>
          {image ? 
            <img src={image.src} style={{maxWidth: "100%", maxHeight: "100%"}} />
          : 
            <div>
              <MediaDropzone onDrop={(files) => onDropMedia(files)} accept={"image/*"} />
            </div>
          }
        </div>
      </Draggable>


      <div style={controlsStyle}>
        <p>CONTROLS</p>
        <div>
          <label>GridDivisor</label>
          <input type={"range"} min={1} max={30} style={sliderStyle} value={gridDivisor} onChange={(e) => setGridDivisor(e.target.value)}></input>
          <p style={pInline}>{gridDivisor}</p>
        </div>

        <div>
          <div>
            <label>HelloBox grid-X</label>
            <input type={"range"} min={1} max={30} style={sliderStyle} value={helloXCell} onChange={(e) => setHelloXCell(e.target.value)}></input>
            <p style={pInline}>{helloXCell}</p>
          </div>
          <div>
            <label>HelloBox grid-Y</label>
            <input type={"range"} min={1} max={30} style={sliderStyle} value={helloYCell} onChange={(e) => setHelloYCell(e.target.value)}></input>
            <p style={pInline}>{helloYCell}</p>
          </div>
        </div>

        <div>
          <div>
            <label>Tatu grid-X</label>
            <input type={"range"} min={1} max={30} style={sliderStyle} value={tatuXCell} onChange={(e) => setTatuXCell(e.target.value)}></input>
            <p style={pInline}>{tatuXCell}</p>
          </div>
          <div>
            <label>Tatu grid-Y</label>
            <input type={"range"} min={1} max={30} style={sliderStyle} value={tatuYCell} onChange={(e) => setTatuYCell(e.target.value)}></input>
            <p style={pInline}>{tatuYCell}</p>
          </div>
        </div>

        <div>
          <div>
            <label>Image grid-X</label>
            <input type={"range"} min={1} max={30} style={sliderStyle} value={imageXCell} onChange={(e) => setImageXCell(e.target.value)}></input>
            <p style={pInline}>{imageXCell}</p>
          </div>
          <div>
            <label>Image grid-Y</label>
            <input type={"range"} min={1} max={30} style={sliderStyle} value={imageYCell} onChange={(e) => setImageYCell(e.target.value)}></input>
            <p style={pInline}>{imageYCell}</p>
          </div>
        </div>

      </div>
    </div>
  )
}
