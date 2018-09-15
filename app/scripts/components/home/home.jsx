import React from 'react';

import Countdown from './countdown.jsx';
import Quote from './quote.jsx';
import About from './about.jsx';

export default function Home() {
    return (
        <div>
            <About />
            <hr />
            <Countdown />
            <hr />
            <Quote />
        </div>
    );
}
