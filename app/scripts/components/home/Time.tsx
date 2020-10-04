import React, { useCallback, useEffect, useRef, useState } from 'react';

interface TimeProps {
    locale: string;
    timeZone: string;
}

export const Time: React.FC<TimeProps> = ({ locale, timeZone }) => {
    const now = useCallback((): string => new Date().toLocaleTimeString(locale, { timeZone }), [locale, timeZone]);

    const interval = useRef<number>(0);
    const [time, setTime] = useState<string>(now());

    useEffect(() => {
        const tick = (): void => setTime(now());

        tick();
        interval.current = window.setInterval(tick, 1000);

        return (): void => window.clearInterval(interval.current);
    }, [now]);

    return <>{time}</>;
};

Time.displayName = 'Time';
