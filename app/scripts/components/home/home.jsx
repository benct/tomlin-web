import React from 'react';
import { Link } from 'react-router-dom';

import Countdown from './countdown.jsx';
import Quote from './quote.jsx';

export default function Home() {
    return (
        <>
            <div className="wrapper text">
                Well hello there!
                <br />
                Unfortunately, there&apos;s not that much interesting here...
                <br />
                <br />
                This site was developed a while back using React, for the purpose of learning and testing new features, and acquiring basic
                knowledge about Webpack, Babel, Node and other web development technologies. For more information about me, click&nbsp;
                <Link to="/about">here</Link>
                &nbsp;or feel free to follow the social links at the bottom of the page.
                <br />
                <br />
                <a href="https://github.com/benct/tomlin-web/blob/master/CHANGELOG.md" target="_blank" rel="noopener noreferrer">
                    Version 2.6.1
                </a>
            </div>
            <hr />
            <Countdown />
            <hr />
            <Quote />
        </>
    );
}
