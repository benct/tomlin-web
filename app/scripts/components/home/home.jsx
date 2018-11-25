import React from 'react';
import { Link } from 'react-router-dom';

import Countdown from './countdown.jsx';
import State from './state.jsx';
import Quote from './quote.jsx';

export default function Home() {
    return (
        <>
            <div className="wrapper text">
                <h2 className="home-title color-primary">Welcome</h2>
                This site was developed a while back using React, for the purpose of learning and testing new features and acquiring basic
                knowledge about Webpack, Babel, Node and other web development technologies. More information about me can be found under
                the <Link to="/about">about</Link> tab, or feel free to follow the social links at the bottom of the page.
                <br />
                <br />
                <a href="https://github.com/benct/tomlin-web/blob/master/CHANGELOG.md" target="_blank" rel="noopener noreferrer">
                    Version 2.7.4
                </a>
            </div>
            <hr />
            <State />
            <hr />
            <Quote />
            <hr />
            <div className="wrapper text-center color-primary countdown-container">
                <Countdown day={3} month={8} year={2019} hour={13} title="Wedding" />
                <Countdown day={25} month={12} title="Christmas" />
            </div>
        </>
    );
}
