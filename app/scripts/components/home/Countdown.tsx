import React from 'react';

interface CountdownProps {
    title: string;
    day: number;
    month: number;
    year?: number;
    hour?: number;
    icon?: string;
}

const toDate = (hour: number, day: number, month: number, year?: number): Date => {
    const now = new Date();
    const y = year || now.getFullYear() + (month > now.getMonth() || (month === now.getMonth() && day > now.getDate()) ? 0 : 1);
    return new Date(y, month - 1, day, hour);
};

const Countdown: React.FC<CountdownProps> = props => {
    const interval = React.useRef<number>(0);
    const countdownTo = React.useRef<Date>(toDate(props.hour || 0, props.day, props.month, props.year));

    const [days, setDays] = React.useState<number>(0);
    const [hours, setHours] = React.useState<number>(0);
    const [minutes, setMinutes] = React.useState<number>(0);
    const [seconds, setSeconds] = React.useState<number>(0);

    React.useEffect(() => {
        const timeComponent = (x: number, v: number): number => Math.floor(x / v);

        const calculateCountdown = (): void => {
            const timestamp = (countdownTo.current.getTime() - Date.now()) / 1000;

            setDays(timeComponent(timestamp, 24 * 60 * 60));
            setHours(timeComponent(timestamp, 60 * 60) % 24);
            setMinutes(timeComponent(timestamp, 60) % 60);
            setSeconds(timeComponent(timestamp, 1) % 60);
        };

        calculateCountdown();
        interval.current = window.setInterval(calculateCountdown, 1000);

        return (): void => {
            window.clearInterval(interval.current);
        };
    }, []);

    const renderTimeUnit = (time: number, unit: string): React.ReactElement => (
        <li className="countdown-time-wrap">
            <span className="countdown-time">{time}</span>
            <p className="countdown-unit">{unit}</p>
        </li>
    );

    return (
        <div className="wrapper text-center">
            <div className="countdown-title color-primary">
                {props.title}{' '}
                {props.icon ? (
                    <img
                        src={require(`../../../images/icon/${props.icon}.svg`)}
                        alt="countdown"
                        width={26}
                        height={26}
                        style={{ verticalAlign: 'top' }}
                    />
                ) : null}
            </div>
            <ul className="countdown">
                {renderTimeUnit(days, 'days')}
                {renderTimeUnit(hours, 'hours')}
                {renderTimeUnit(minutes, 'minutes')}
                {renderTimeUnit(seconds, 'seconds')}
            </ul>
        </div>
    );
};

export default React.memo(Countdown);
