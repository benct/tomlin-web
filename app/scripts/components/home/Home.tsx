import React from 'react';
import { Link } from 'react-router-dom';

import Countdown from './Countdown';
import State from './State';
import Quote from './Quote';

const Home: React.FC = (): React.ReactElement => (
    <>
        <div className="wrapper text">
            <h2 className="home-title color-primary mbm">Hello.</h2>
            <p className="limit-width mvl">
                This site is just a personal website project I doodle with from time to time. See more about me{' '}
                <Link to="/about">here</Link> or follow the social media links at the bottom of the page.
            </p>
            <a href="https://github.com/benct/tomlin-web/blob/master/CHANGELOG.md" target="_blank" rel="noopener noreferrer">
                Version 2.12.0
            </a>
        </div>
        <hr />
        <State />
        <hr />
        <Countdown day={24} month={12} title="Countdown to something..." icon="christmas" />
        <hr />
        <Quote />
    </>
);

export default React.memo(Home);
