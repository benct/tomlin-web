import React from 'react';
import PropTypes from 'prop-types';

export default class Countdown extends React.PureComponent {
    constructor(props) {
        super(props);

        this.countdownTo = props.year
            ? new Date(props.year, props.month - 1, props.day, props.hour || 0)
            : Countdown.toDate(props.day, props.month - 1);

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

    static toDate(day, month) {
        const now = new Date();
        const year = now.getFullYear() + (month > now.getMonth() || (month === now.getMonth() && day > now.getDate()) ? 0 : 1);
        return new Date(year, month, day);
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

    static renderTimeUnit(time, unit) {
        return (
            <li className="countdown-time-wrap">
                <span className="countdown-time">{time}</span>
                <p className="countdown-unit">{unit}</p>
            </li>
        );
    }

    render() {
        return (
            <div className="wrapper text-center color-primary">
                <div className="countdown-title">{this.props.title}</div>
                <ul className="countdown">
                    {Countdown.renderTimeUnit(this.state.days, 'days')}
                    {Countdown.renderTimeUnit(this.state.hours, 'hours')}
                    {Countdown.renderTimeUnit(this.state.minutes, 'minutes')}
                    {Countdown.renderTimeUnit(this.state.seconds, 'seconds')}
                </ul>
            </div>
        );
    }
}

Countdown.propTypes = {
    title: PropTypes.string.isRequired,
    day: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    year: PropTypes.number,
    hour: PropTypes.number,
};
