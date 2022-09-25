import { FC, Fragment, ReactElement, useRef } from 'react';

import { formatThousands } from '../../util/formatting';
import { useAppContext } from '../../data/context';
import { useAdminActions, useAdminStats } from '../../data/admin';

import { Loading } from '../page/Loading';

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

    const getCount = (field: HTMLSelectElement | null): number | undefined => (field ? Number(field.value) : undefined);

    const getValue = (field: HTMLSelectElement | HTMLInputElement | null): string | null =>
        field && field.value !== 'none' ? field.value : null;

    const renderOptions = (values: number[]): ReactElement[] =>
        values.map(
            (opt, idx): ReactElement => (
                <option key={`ctrlOpt${idx}`} value={opt}>
                    {opt}
                </option>
            )
        );

    return (
        <div className="wrapper min-height ptm">
            <Loading isLoading={loading} text="Loading stats...">
                <div className="admin-stats text-center text-small">
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
                </div>
            </Loading>
            <hr className="divider" />
            <div className="admin-list text">
                <span className="truncate">Countdown icon</span>
                <select className="input input-small" defaultValue={settings.countdownIcon} ref={countdownIcon}>
                    <option value="none">None</option>
                    <option value="birthday">Birthday</option>
                    <option value="christmas">Christmas</option>
                    <option value="newyear">New Year</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="wedding">Wedding</option>
                </select>
                <button className="input input-small" onClick={() => saveSetting('countdownIcon', getValue(countdownIcon.current))}>
                    Set
                </button>
                <span className="truncate">Countdown target date</span>
                <input className="input input-small" type="datetime-local" defaultValue={settings.countdownTarget} ref={countdownTarget} />
                <button className="input input-small" onClick={() => saveSetting('countdownTarget', getValue(countdownTarget.current))}>
                    Set
                </button>
            </div>
            <hr className="divider" />
            <div className="admin-list text">
                <span className="truncate">Update number of stored movies</span>
                <select className="input input-small" defaultValue="50" ref={updateMovieCount}>
                    {renderOptions([10, 50, 100, 250, 500])}
                </select>
                <button className="input input-small" onClick={() => updateMedia('movie', getCount(updateMovieCount.current))}>
                    Run
                </button>
                <span className="truncate">Update number of stored tv-shows</span>
                <select className="input input-small" defaultValue="10" ref={updateTvCount}>
                    {renderOptions([5, 10, 50, 100])}
                </select>
                <button className="input input-small" onClick={() => updateMedia('tv', getCount(updateTvCount.current))}>
                    Run
                </button>
            </div>
            <hr className="divider" />
            <div className="admin-list text">
                <span className="truncate">Update IATA airline entries</span>
                <span />
                <button className="input input-small" onClick={() => updateIata('airlines')}>
                    Run
                </button>
                <span className="truncate">Update IATA location entries</span>
                <span />
                <button className="input input-small" onClick={() => updateIata('locations')}>
                    Run
                </button>
            </div>
            <hr className="divider" />
            <div className="admin-list text">
                <span className="truncate">Clear all log messages</span>
                <span />
                <button className="input input-small" onClick={() => clearLogs()}>
                    Clear
                </button>
                <span className="truncate">Run database backup</span>
                <span />
                <button className="input input-small" onClick={() => backup()}>
                    Backup
                </button>
            </div>
            <hr className="divider" />
            <div className="admin-list text">
                <span className="truncate">Latest Home Assistant states</span>
                <select className="input input-small" defaultValue="25" ref={hassCount}>
                    {renderOptions([10, 25, 50, 100, 250, 500])}
                </select>
                <button className="input input-small" onClick={() => getHass(getCount(hassCount.current))}>
                    Load
                </button>
            </div>
            <div className="admin-list text-small mtl">
                {hass.map((state) => (
                    <Fragment key={`hass${state.id}`}>
                        <span className="truncate">{state.sensor}</span>
                        <span className="strong">{state.value}</span>
                        <span>{state.updated}</span>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};
