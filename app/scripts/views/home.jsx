import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '../components/navigation.jsx';
import Countdown from '../components/countdown.jsx';
import Quote from '../components/quote.jsx';
import About from '../components/about.jsx';

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
