import React from 'react';

export default class Countdown extends React.Component {
    constructor(props) {
        super(props);

        this.countdownTo = 1600000000000;
        this.state = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    componentDidMount() {
        this.calculateCountdown();
        this.interval = setInterval(this.calculateCountdown.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    static timeComponent(x, v) {
        return Math.floor(x / v);
    }

    calculateCountdown() {
        const timestamp = (this.countdownTo - Date.now()) / 1000;

        this.setState({
            days: Countdown.timeComponent(timestamp, 24 * 60 * 60),
            hours: Countdown.timeComponent(timestamp, 60 * 60) % 24,
            minutes: Countdown.timeComponent(timestamp, 60) % 60,
            seconds: Countdown.timeComponent(timestamp, 1) % 60,
        });
    }

    render() {
        return (
            <div className="wrapper text-center color-primary">
                <div className="countdown-title">Under construction, coming &quot;soon&quot;</div>
                <ul className="countdown">
                    <li className="time-wrap">
                        <span className="time">{this.state.days}</span>
                        <p className="unit">days</p>
                    </li>
                    <li className="time-wrap">
                        <span className="time">{this.state.hours}</span>
                        <p className="unit">hours</p>
                    </li>
                    <li className="time-wrap">
                        <span className="time">{this.state.minutes}</span>
                        <p className="unit">minutes</p>
                    </li>
                    <li className="time-wrap">
                        <span className="time">{this.state.seconds}</span>
                        <p className="unit">seconds</p>
                    </li>
                </ul>
            </div>
        );
    }
}
