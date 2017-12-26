import React from 'react';
import Login from './login.jsx';
import Countdown from "../components/countdown.jsx";
import Quote from "../components/quote.jsx";
import About from "../components/about.jsx";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Countdown/>
                <hr/>
                <About/>
                <hr/>
                <Login/>
                <hr/>
                <Quote/>
            </div>
        );
    }
}