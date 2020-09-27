import React, { useEffect, useRef, useState } from 'react';

interface TimeProps {
    locale: string;
    timeZone: string;
}

const Time: React.FC<TimeProps> = ({ locale, timeZone }) => {
    const now = (): string => new Date().toLocaleTimeString(locale, { timeZone });

    const interval = useRef<number>(0);
    const [time, setTime] = useState<string>(now());

    useEffect(() => {
        const tick = (): void => setTime(now());

        tick();
        interval.current = window.setInterval(tick, 1000);

        return (): void => window.clearInterval(interval.current);
    }, []);

    return <>{time}</>;
};

export default React.memo(Time);
