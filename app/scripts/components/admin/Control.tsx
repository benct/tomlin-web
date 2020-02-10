import React from 'react';
import { connect } from 'react-redux';

import { DefaultState, Hass, Settings, ThunkDispatchProp } from '../../interfaces';
import { formatThousands } from '../../util/formatting';
import { backup, clearLogs, getHass, getStats, saveSetting, updateIata, updateMedia } from '../../actions/admin';

interface ControlProps {
    stats: Record<string, number>;
    hass: Hass[];
    isLoggedIn: boolean;
    settings: Settings;
}

const Control: React.FC<ControlProps & ThunkDispatchProp> = ({ stats, hass, isLoggedIn, settings, dispatch }) => {
    const hassCount = React.useRef<HTMLSelectElement>(null);
    const updateMovieCount = React.useRef<HTMLSelectElement>(null);
    const updateTvCount = React.useRef<HTMLSelectElement>(null);
    const countdownIcon = React.useRef<HTMLSelectElement>(null);
    const countdownTarget = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (!stats.log) {
            dispatch(getStats());
        }
    }, [isLoggedIn]);

    const formatStat = (key: string): string => (stats[key] !== undefined ? formatThousands(stats[key]) : '-');

    const getCount = (field: HTMLSelectElement | null): number | undefined => (field ? Number(field.value) : undefined);

    const getValue = (field: HTMLSelectElement | HTMLInputElement | null): string | null =>
        field && field.value !== 'none' ? field.value : null;

    const renderOptions = (values: number[]): React.ReactElement[] =>
        values.map(
            (opt, idx): React.ReactElement => (
                <option key={`ctrlOpt${idx}`} value={opt}>
                    {opt}
                </option>
            )
        );

    return (
        <>
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
                <button
                    className="input input-small"
                    onClick={(): Promise<void> => dispatch(saveSetting('countdownIcon', getValue(countdownIcon.current)))}>
                    Set
                </button>
                <span className="truncate">Countdown target date</span>
                <input className="input input-small" type="datetime-local" defaultValue={settings.countdownTarget} ref={countdownTarget} />
                <button
                    className="input input-small"
                    onClick={(): Promise<void> => dispatch(saveSetting('countdownTarget', getValue(countdownTarget.current)))}>
                    Set
                </button>
            </div>
            <hr className="divider" />
            <div className="admin-list text">
                <span className="truncate">Update number of stored movies</span>
                <select className="input input-small" defaultValue="50" ref={updateMovieCount}>
                    {renderOptions([10, 50, 100, 250, 500])}
                </select>
                <button
                    className="input input-small"
                    onClick={(): Promise<void> => dispatch(updateMedia('movie', getCount(updateMovieCount.current)))}>
                    Run
                </button>
                <span className="truncate">Update number of stored tv-shows</span>
                <select className="input input-small" defaultValue="10" ref={updateTvCount}>
                    {renderOptions([5, 10, 50, 100])}
                </select>
                <button
                    className="input input-small"
                    onClick={(): Promise<void> => dispatch(updateMedia('tv', getCount(updateTvCount.current)))}>
                    Run
                </button>
            </div>
            <hr className="divider" />
            <div className="admin-list text">
                <span className="truncate">Update IATA airline entries</span>
                <span />
                <button className="input input-small" onClick={(): Promise<void> => dispatch(updateIata('airlines'))}>
                    Run
                </button>
                <span className="truncate">Update IATA location entries</span>
                <span />
                <button className="input input-small" onClick={(): Promise<void> => dispatch(updateIata('locations'))}>
                    Run
                </button>
            </div>
            <hr className="divider" />
            <div className="admin-list text">
                <span className="truncate">Clear all log messages</span>
                <span />
                <button className="input input-small" onClick={(): Promise<void> => dispatch(clearLogs())}>
                    Clear
                </button>
                <span className="truncate">Run database backup</span>
                <span />
                <button className="input input-small" onClick={(): Promise<void> => dispatch(backup())}>
                    Backup
                </button>
            </div>
            <hr className="divider" />
            <div className="admin-list text">
                <span className="truncate">Latest Home Assistant states</span>
                <select className="input input-small" defaultValue="25" ref={hassCount}>
                    {renderOptions([10, 25, 50, 100, 250, 500])}
                </select>
                <button className="input input-small" onClick={(): Promise<void> => dispatch(getHass(getCount(hassCount.current)))}>
                    Load
                </button>
            </div>
            <div className="admin-list text-small mtl">
                {hass.map(state => (
                    <React.Fragment key={`hass${state.id}`}>
                        <span className="truncate">{state.sensor}</span>
                        <span className="strong">{state.value}</span>
                        <span>{state.updated}</span>
                    </React.Fragment>
                ))}
            </div>
        </>
    );
};

export default connect(
    (state: DefaultState): ControlProps => ({
        stats: state.admin.stats,
        hass: state.admin.hass,
        isLoggedIn: state.auth.isLoggedIn,
        settings: state.settings,
    })
)(Control);
