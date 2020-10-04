import React, { memo, useEffect, useRef, useState } from 'react';

interface CountdownProps {
    title: string;
    timestamp?: string;
    icon?: string;
}

export const Countdown: React.FC<CountdownProps> = memo(({ title, timestamp, icon }) => {
    const interval = useRef<number>(0);
    const countdownTarget = useRef<Date | null>(null);

    const [days, setDays] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    useEffect(() => {
        countdownTarget.current = timestamp ? new Date(timestamp) : null;

        const timeComponent = (x: number, v: number): number => Math.floor(x / v);

        const calculateCountdown = (): void => {
            if (countdownTarget.current) {
                const timestamp = (countdownTarget.current.getTime() - Date.now()) / 1000;

                setDays(timeComponent(timestamp, 24 * 60 * 60));
                setHours(timeComponent(timestamp, 60 * 60) % 24);
                setMinutes(timeComponent(timestamp, 60) % 60);
                setSeconds(timeComponent(timestamp, 1) % 60);
            }
        };

        calculateCountdown();
        interval.current = window.setInterval(calculateCountdown, 1000);

        return (): void => {
            window.clearInterval(interval.current);
        };
    }, [timestamp]);

    const renderTimeUnit = (time: number, unit: string): React.ReactElement => (
        <li className="countdown-time-wrap">
            <span className="countdown-time">{time}</span>
            <p className="countdown-unit">{unit}</p>
        </li>
    );

    return (
        <div className="wrapper text-center">
            <div className="countdown-title color-primary">
                {title}{' '}
                {icon ? (
                    <img
                        src={require(`../../../images/icon/${icon}.svg`)}
                        alt={icon}
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
});

Countdown.displayName = 'Countdown';
