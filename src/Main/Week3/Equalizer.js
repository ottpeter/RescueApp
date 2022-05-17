import React from 'react';
import Canvas from './Canvas';

const Equalizer = ({musicCID, nftStorageLink}) => {
    return <>
    <header className="splash-eq">
        <Canvas musicCID={musicCID} nftStorageLink={nftStorageLink} />
    </header>
    </>
}

export default Equalizer;