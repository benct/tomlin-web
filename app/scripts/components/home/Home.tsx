import React from 'react';
import { Link } from 'react-router-dom';

import Countdown from './Countdown';
import State from './State';
import Quote from './Quote';

const Home: React.FC = (): React.ReactElement => (
    <>
        <div className="wrapper text">
            <h2 className="home-title color-primary mbm">Welcome</h2>
            This site was developed a while back using React, for the purpose of learning and testing new features and acquiring basic
            knowledge about Webpack, Babel, Node and other web development technologies. More information about me can be found under the{' '}
            <Link to="/about">about</Link> tab, or feel free to follow the social links at the bottom of the page.
            <br />
            <br />
            <a href="https://github.com/benct/tomlin-web/blob/master/CHANGELOG.md" target="_blank" rel="noopener noreferrer">
                Version 2.10.0
            </a>
        </div>
        <hr />
        <State />
        <hr />
        <Countdown day={3} month={8} year={2019} hour={13} title="Countdown to something..." icon="wedding" />
        <hr />
        <Quote />
    </>
);

export default React.memo(Home);
