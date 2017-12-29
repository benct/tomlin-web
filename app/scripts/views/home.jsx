import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import Login from './login.jsx';
import Countdown from "../components/countdown.jsx";
import Quote from "../components/quote.jsx";
import About from "../components/about.jsx";

export default function Home(props) {
    function renderNavigation() {
        return (
            <nav className="wrapper centerify">
                <ul className="menu unselectable">
                    <li><Link to="/files">Files</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                </ul>
            </nav>
        );
    }

    return (
        <div>
            <Countdown/>
            <hr/>
            <About/>
            <hr/>
            { props.loggedIn ? renderNavigation() : <Login {...props}/> }
            <hr/>
            <Quote/>
        </div>
    );
}

Home.propTypes = {
    loggedIn: PropTypes.bool
};
