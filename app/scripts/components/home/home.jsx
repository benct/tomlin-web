import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '../page/navigation.jsx';
import Countdown from './countdown.jsx';
import Quote from './quote.jsx';
import About from './about.jsx';

export default function Home(props) {
    return (
        <div>
            <Countdown />
            <hr />
            <About />
            <hr />
            <Navigation simple showMenu hideHome loggedIn={props.loggedIn} />
            <hr />
            <Quote />
        </div>
    );
}

Home.propTypes = {
    loggedIn: PropTypes.bool,
};
