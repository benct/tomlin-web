import React from 'react';

interface TimeProps {
    locale: string;
    timeZone: string;
}

const Time: React.FC<TimeProps> = ({ locale, timeZone }) => {
    const now = (): string => new Date().toLocaleTimeString(locale, { timeZone });

    const [time, setTime] = React.useState<string>(now());

    const tick = (): void => {
        setTime(now());
    };

    React.useEffect(() => {
        tick();

        const interval = window.setInterval(tick, 1000);

        return (): void => window.clearInterval(interval);
    }, []);

    return <>{time}</>;
};

export default React.memo(Time);
