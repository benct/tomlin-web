import React from 'react';

interface CountdownProps {
    title: string;
    day: number;
    month: number;
    year?: number;
    hour?: number;
    icon?: string;
}

interface CountdownState {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default class Countdown extends React.PureComponent<CountdownProps, CountdownState> {
    interval: number;
    countdownTo: Date;

    constructor(props: CountdownProps) {
        super(props);

        this.interval = 0;
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

    componentDidMount(): void {
        this.calculateCountdown();
        this.interval = window.setInterval(this.calculateCountdown.bind(this), 1000);
    }

    componentWillUnmount(): void {
        window.clearInterval(this.interval);
    }

    static toDate(day: number, month: number): Date {
        const now = new Date();
        const year = now.getFullYear() + (month > now.getMonth() || (month === now.getMonth() && day > now.getDate()) ? 0 : 1);
        return new Date(year, month, day);
    }

    static timeComponent(x: number, v: number): number {
        return Math.floor(x / v);
    }

    calculateCountdown(): void {
        const timestamp = (this.countdownTo.getTime() - Date.now()) / 1000;

        this.setState({
            days: Countdown.timeComponent(timestamp, 24 * 60 * 60),
            hours: Countdown.timeComponent(timestamp, 60 * 60) % 24,
            minutes: Countdown.timeComponent(timestamp, 60) % 60,
            seconds: Countdown.timeComponent(timestamp, 1) % 60,
        });
    }

    static renderTimeUnit(time: number, unit: string): React.ReactElement {
        return (
            <li className="countdown-time-wrap">
                <span className="countdown-time">{time}</span>
                <p className="countdown-unit">{unit}</p>
            </li>
        );
    }

    render(): React.ReactElement {
        return (
            <div className="wrapper text-center color-primary">
                <div className="countdown-title">
                    {this.props.title}{' '}
                    {this.props.icon ? (
                        <img
                            src={require(`../../../images/icon/${this.props.icon}.svg`)}
                            alt="countdown"
                            width={26}
                            height={26}
                            style={{ verticalAlign: 'top' }}
                        />
                    ) : null}
                </div>
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
