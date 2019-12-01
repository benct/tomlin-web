import React from 'react';
import { connect } from 'react-redux';

import { AdminStats, DefaultState, Settings, ThunkDispatchProp } from '../../interfaces';
import { formatThousands } from '../../util/formatting';
import { clearLogs, getLogs, getStats, saveSetting, updateIata, updateMedia, updatePosters } from '../../actions/admin';

interface ControlProps {
    stats: AdminStats;
    isLoggedIn: boolean;
    settings: Settings;
}

const Control: React.FC<ControlProps & ThunkDispatchProp> = ({ stats, isLoggedIn, settings, dispatch }) => {
    const logCount = React.useRef<HTMLSelectElement>(null);
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
            <div className="admin-list text text-left">
                <span className="truncate">Set countdown icon</span>
                <select className="input input-small" defaultValue={settings.countdownIcon} ref={countdownIcon}>
                    <option value="birthday">Birthday</option>
                    <option value="christmas">Christmas</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="wedding">Wedding</option>
                </select>
                <button
                    className="input input-small"
                    onClick={(): Promise<void> =>
                        dispatch(saveSetting('countdownIcon', countdownIcon.current && countdownIcon.current.value))
                    }>
                    Set
                </button>
                <span className="truncate">Set countdown target</span>
                <input className="input input-small" type="datetime-local" defaultValue={settings.countdownTarget} ref={countdownTarget} />
                <button
                    className="input input-small"
                    onClick={(): Promise<void> =>
                        dispatch(saveSetting('countdownTarget', countdownTarget.current && countdownTarget.current.value))
                    }>
                    Set
                </button>
            </div>
            <hr className="divider" />
            <div className="admin-list text text-left">
                <span className="truncate">Import missing media poster images</span>
                <span />
                <button className="input input-small" onClick={(): Promise<void> => dispatch(updatePosters())}>
                    Run
                </button>
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
            <div className="admin-list text text-left">
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
            <div className="admin-list text text-left">
                <span className="truncate">Clear all log messages</span>
                <span />
                <button className="input input-small" onClick={(): Promise<void> => dispatch(clearLogs())}>
                    Clear
                </button>
                <span className="truncate">Default number of log messages</span>
                <select className="input input-small" defaultValue="25" ref={logCount}>
                    {renderOptions([10, 25, 50, 100, 250, 500])}
                </select>
                <button className="input input-small" onClick={(): Promise<void> => dispatch(getLogs(getCount(logCount.current)))}>
                    Load
                </button>
            </div>
        </>
    );
};

export default connect(
    (state: DefaultState): ControlProps => ({ stats: state.admin.stats, isLoggedIn: state.auth.isLoggedIn, settings: state.settings })
)(Control);
