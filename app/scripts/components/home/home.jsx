import React from 'react';
import { Link } from 'react-router-dom';

import State from './state.jsx';
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
        </>
    );
}
