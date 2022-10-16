import { FC, Fragment, ReactElement, useRef } from 'react';

import { input, select } from '@/styles';
import { formatThousands } from '@/util/formatting';
import { useAppContext } from '@/data/context';
import { useAdminActions, useAdminStats } from '@/data/admin';

import { Loading } from '@/components/page/Loading';
import { Button } from '@/components/page/Button';
import { Box } from '@/components/page/Box';

export const Admin: FC = () => {
    const hassCount = useRef<HTMLSelectElement>(null);
    const updateMovieCount = useRef<HTMLSelectElement>(null);
    const updateTvCount = useRef<HTMLSelectElement>(null);
    const countdownIcon = useRef<HTMLSelectElement>(null);
    const countdownTarget = useRef<HTMLInputElement>(null);

    const { settings } = useAppContext();
    const { stats, loading } = useAdminStats();
    const { saveSetting, clearLogs, updateIata, updateMedia, backup, getHass, hass } = useAdminActions();

    const formatStat = (key: string): string => (stats?.[key] !== undefined ? formatThousands(stats[key]) : '-');

    const getCount = (field: HTMLSelectElement | null): string | undefined => (field ? field.value : undefined);

    const getValue = (field: HTMLSelectElement | HTMLInputElement | null): string | null =>
        field && field.value !== 'none' ? field.value : null;

    const renderOptions = (values: (number | string)[]): ReactElement[] =>
        values.map(
            (opt, idx): ReactElement => (
                <option key={`ctrlOpt${idx}`} value={opt}>
                    {opt}
                </option>
            )
        );

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
                        HA Events: {formatStat('hass')}
                        <br />
                        Logs: {formatStat('log')}
                    </div>
                </Loading>
            </Box>
            <Box title="Settings" border="border-b" className="grid grid-cols-admin gap-12 items-center">
                <span className="truncate">Countdown icon</span>
                <select className={select} defaultValue={settings.countdownIcon} ref={countdownIcon}>
                    <option value="none">None</option>
                    <option value="birthday">Birthday</option>
                    <option value="christmas">Christmas</option>
                    <option value="newyear">New Year</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="wedding">Wedding</option>
                </select>
                <Button text="Set" onClick={() => saveSetting('countdownIcon', getValue(countdownIcon.current))} />
                <span className="truncate">Countdown target date</span>
                <input className={`${input} text-12`} type="datetime-local" defaultValue={settings.countdownTarget} ref={countdownTarget} />
                <Button text="Set" onClick={() => saveSetting('countdownTarget', getValue(countdownTarget.current))} />
            </Box>
            <Box title="Tasks" border="border-b" className="grid grid-cols-admin gap-12 items-center">
                <span className="truncate">Update number of stored movies</span>
                <select className={select} defaultValue="50" ref={updateMovieCount}>
                    {renderOptions([10, 50, 100, 250, 500, 'all'])}
                </select>
                <Button text="Run" onClick={() => updateMedia('movie', getCount(updateMovieCount.current))} />
                <span className="truncate">Update number of stored tv-shows</span>
                <select className={select} defaultValue="10" ref={updateTvCount}>
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
            <Box title="Home Assistant" className="grid grid-cols-admin gap-12 items-center">
                <span className="truncate">Latest Home Assistant states</span>
                <select className={select} defaultValue="25" ref={hassCount}>
                    {renderOptions([10, 25, 50, 100, 250, 500])}
                </select>
                <Button text="Load" onClick={() => getHass(getCount(hassCount.current))} />
                <div className="col-span-3 grid grid-cols-admin gap-12 mt-16">
                    {hass.map((state) => (
                        <Fragment key={`hass${state.id}`}>
                            <span className="truncate">{state.sensor}</span>
                            <span className="font-bold">{state.value}</span>
                            <span>{state.updated}</span>
                        </Fragment>
                    ))}
                </div>
            </Box>
        </>
    );
};
