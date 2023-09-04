import { ReactElement, useEffect, useRef, useState } from 'react';

import { formatThousands } from '@/util/formatting';
import { useAdminActions, useAdminData } from '@/data/admin';

import { Loading } from '@/components/page/Loading';
import { Button } from '@/components/page/Button';
import { Box } from '@/components/page/Box';

export const Admin = () => {
    const { stats, settings, loading } = useAdminData();
    const { saveSetting, clearLogs, updateIata, updateMedia, backup } = useAdminActions();

    const updateMovieCount = useRef<HTMLSelectElement>(null);
    const updateTvCount = useRef<HTMLSelectElement>(null);
    const countdownTarget = useRef<HTMLInputElement>(null);
    const [countdownIcon, setCountdownIcon] = useState<string>('none');

    useEffect(() => {
        if (settings?.countdownIcon) {
            setCountdownIcon(settings?.countdownIcon ?? 'none');
        }
    }, [settings, setCountdownIcon]);

    const formatStat = (key: string): string => (stats?.[key] !== undefined ? formatThousands(stats[key]) : '-');

    const getCount = (field: HTMLSelectElement | null): string | undefined => (field ? field.value : undefined);

    const renderOptions = (values: (number | string)[]): ReactElement[] =>
        values.map((opt, idx) => (
            <option key={`ctrlOpt${idx}`} value={opt}>
                {opt}
            </option>
        ));

    return (
        <>
            <Box title="Administration" className="grid grid-cols-2 sm:grid-cols-4 gap-x-16 gap-y-8 text-center text-14" border="border-b">
                <Loading isLoading={loading} text="Loading stats..." className="col-span-2 sm:col-span-4">
                    <div>
                        Movies: {formatStat('movie')}
                        <br />
                        TV: {formatStat('tv')}
                    </div>
                    <div>
                        Seasons: {formatStat('season')}
                        <br />
                        Episodes: {formatStat('episode')}
                    </div>
                    <div>
                        Airlines: {formatStat('airline')}
                        <br />
                        Locations: {formatStat('location')}
                    </div>
                    <div>
                        Logs: {formatStat('log')}
                        <br />
                        Visits: {formatStat('visit')}
                    </div>
                </Loading>
            </Box>
            <Box title="Settings" border="border-b" className="grid grid-cols-admin gap-12 items-center">
                <span className="truncate">Countdown icon</span>
                <select className="input text-12 pr-16" value={countdownIcon} onChange={(e) => setCountdownIcon(e.target.value)}>
                    <option value="none">None</option>
                    <option value="birthday">Birthday</option>
                    <option value="christmas">Christmas</option>
                    <option value="newyear">New Year</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="wedding">Wedding</option>
                </select>
                <Button text="Set" onClick={() => saveSetting('countdownIcon', countdownIcon)} />
                <span className="truncate">Countdown target date</span>
                <input className="input text-12" type="datetime-local" defaultValue={settings?.countdownTarget} ref={countdownTarget} />
                <Button text="Set" onClick={() => saveSetting('countdownTarget', countdownTarget.current?.value)} />
            </Box>
            <Box title="Tasks" border="border-b" className="grid grid-cols-admin gap-12 items-center">
                <span className="truncate">Update number of stored movies</span>
                <select className="input text-12 pr-16" defaultValue="50" ref={updateMovieCount}>
                    {renderOptions([10, 50, 100, 250, 500, 'all'])}
                </select>
                <Button text="Run" onClick={() => updateMedia('movie', getCount(updateMovieCount.current))} />
                <span className="truncate">Update number of stored tv-shows</span>
                <select className="input text-12 pr-16" defaultValue="10" ref={updateTvCount}>
                    {renderOptions([5, 10, 50, 100, 'all'])}
                </select>
                <Button text="Run" onClick={() => updateMedia('tv', getCount(updateTvCount.current))} />
                <span className="truncate">Update IATA airline entries</span>
                <span />
                <Button text="Run" onClick={() => updateIata('airlines')} />
                <span className="truncate">Update IATA location entries</span>
                <span />
                <Button text="Run" onClick={() => updateIata('locations')} />
                <span className="truncate">Clear all log messages</span>
                <span />
                <Button text="Clear" onClick={() => clearLogs()} />
                <span className="truncate">Run database backup</span>
                <span />
                <Button text="Backup" onClick={() => backup()} />
            </Box>
        </>
    );
};
