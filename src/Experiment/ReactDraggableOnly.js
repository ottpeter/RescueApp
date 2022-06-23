import React, { useState, useCallback } from 'react'
import Draggable from 'react-draggable'
import MediaDropzone from '../Admin/MediaDropzone';

export default function ReactDraggableOnly() {
  const width = window.innerWidth;
  const height = window.innerHeight;
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

  const tatuBoxStyle = {
    border: "2px solid yellow",
    width: (width/4),
    height: (height/4),
  }

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
    </div>
  )
}
