import React from 'react';
import Countdown from "../components/countdown.jsx";
import About from "../components/about.jsx";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Countdown/>
                <hr/>
                <About/>
            </div>
        );
    }
}