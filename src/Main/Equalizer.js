import React from 'react';
import Canvas from './Canvas';

const Equalizer = ({musicCID}) => {
    return <>
    <header className="splash-eq">
        <Canvas musicCID={musicCID} />
    </header>
    </>
}

export default Equalizer;