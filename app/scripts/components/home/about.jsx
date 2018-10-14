import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
    return (
        <div className="wrapper text">
            Well <span className="strong">hello</span> there!
            <br />
            Unfortunately, there&apos;s not that much interesting here...
            <br />
            <br />
            This site was developed a while back using React, for the purpose of learning and testing new features, and acquiring basic
            knowledge about Webpack, Babel, Node and other web development technologies. For more information about me, click&nbsp;
            <Link to="/me">here</Link>
            &nbsp;or feel free to follow the social links at the bottom of the page.
            <br />
            <br />
            <a href="https://github.com/benct/tomlin-web/blob/master/CHANGELOG.md" target="_blank" rel="noopener noreferrer">
                Version 2.6.1
            </a>
        </div>
    );
}
