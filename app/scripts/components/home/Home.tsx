import React from 'react';
import { Link } from 'react-router-dom';

import Countdown from './Countdown';
import State from './State';
import Quote from './Quote';

const Home: React.FC = (): React.ReactElement => (
    <>
        <div className="wrapper text">
            <h2 className="home-title color-primary mbm">Hello.</h2>
            <p className="mha mvl" style={{ maxWidth: '660px' }}>
                This site is just a personal website project I doodle with from time to time. See more about me{' '}
                <Link to="/about">here</Link> or follow the social media links at the bottom of the page.
            </p>
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
