import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Box } from '@/components/page/Box';

interface CountdownProps {
    title: string;
    timestamp?: string;
    icon?: string;
}

export const Countdown = ({ title, timestamp, icon }: CountdownProps) => {
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

    const renderTimeUnit = (time: number, unit: string) => (
        <li className="text-center">
            <span className="text-28 font-bold">{timestamp ? time : '-'}</span>
            <p className="text-12 uppercase">{unit}</p>
        </li>
    );

    const heading = (
        <>
            {title} {icon ? <Image src={`/images/icon/${icon}.svg`} alt={icon} width={24} height={24} /> : null}
        </>
    );

    return (
        <Box title={heading} border="border-b">
            <ul className="flex justify-evenly py-16">
                {renderTimeUnit(days, 'days')}
                {renderTimeUnit(hours, 'hours')}
                {renderTimeUnit(minutes, 'minutes')}
                {renderTimeUnit(seconds, 'seconds')}
            </ul>
        </Box>
    );
};
