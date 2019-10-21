import React from 'react';

interface TimeProps {
    locale: string;
    timeZone: string;
}

const Time: React.FC<TimeProps> = ({ locale, timeZone }) => {
    const now = (): string => new Date().toLocaleTimeString(locale, { timeZone });

    const interval = React.useRef<number>(0);
    const [time, setTime] = React.useState<string>(now());

    React.useEffect(() => {
        const tick = (): void => setTime(now());

        tick();
        interval.current = window.setInterval(tick, 1000);

        return (): void => window.clearInterval(interval.current);
    }, []);

    return <>{time}</>;
};

export default React.memo(Time);
