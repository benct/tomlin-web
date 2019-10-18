import React from 'react';
import { connect } from 'react-redux';

import { AdminStats, DefaultState, ThunkDispatchProp } from '../../interfaces';
import { formatThousands } from '../../util/formatting';
import { clearLogs, getLogs, getStats, updateIata, updateMedia, updatePosters } from '../../actions/admin';

interface ControlProps {
    stats: AdminStats;
}

class Control extends React.PureComponent<ControlProps & ThunkDispatchProp> {
    logCount: React.RefObject<HTMLSelectElement>;
    updateMovieCount: React.RefObject<HTMLSelectElement>;
    updateTvCount: React.RefObject<HTMLSelectElement>;

    constructor(props: ControlProps & ThunkDispatchProp) {
        super(props);

        this.logCount = React.createRef();
        this.updateMovieCount = React.createRef();
        this.updateTvCount = React.createRef();
    }

    componentDidMount(): void {
        if (!this.props.stats.log) {
            this.props.dispatch(getStats());
        }
    }

    formatStat(key: string): string {
        return this.props.stats[key] !== undefined ? formatThousands(this.props.stats[key]) : '-';
    }

    static getInputValue(field: HTMLSelectElement | null): number | undefined {
        return field ? Number(field.value) : undefined;
    }

    static renderOptions(values: number[]): React.ReactElement[] {
        return values.map(
            (opt, idx): React.ReactElement => (
                <option key={`ctrlOpt${idx}`} value={opt}>
                    {opt}
                </option>
            )
        );
    }

    render(): React.ReactElement {
        return (
            <>
                <div className="admin-stats text-center text-small">
                    <div>
                        Movies: {this.formatStat('movie')}
                        <br />
                        TV: {this.formatStat('tv')}
                    </div>
                    <div>
                        Seasons: {this.formatStat('season')}
                        <br />
                        Episodes: {this.formatStat('episode')}
                    </div>
                    <div>
                        Airlines: {this.formatStat('airline')}
                        <br />
                        Locations: {this.formatStat('location')}
                    </div>
                    <div>
                        HA Events: {this.formatStat('hass')}
                        <br />
                        Logs: {this.formatStat('log')}
                    </div>
                </div>
                <hr className="divider" />
                <div className="admin-list text text-left">
                    <span className="truncate">Import missing media poster images</span>
                    <span />
                    <button className="input input-small" onClick={(): Promise<void> => this.props.dispatch(updatePosters())}>
                        Run
                    </button>
                    <span className="truncate">Update number of stored movies</span>
                    <select className="input input-small" defaultValue="50" ref={this.updateMovieCount}>
                        {Control.renderOptions([10, 50, 100, 250, 500])}
                    </select>
                    <button
                        className="input input-small"
                        onClick={(): Promise<void> =>
                            this.props.dispatch(updateMedia('movie', Control.getInputValue(this.updateMovieCount.current)))
                        }>
                        Run
                    </button>
                    <span className="truncate">Update number of stored tv-shows</span>
                    <select className="input input-small" defaultValue="10" ref={this.updateTvCount}>
                        {Control.renderOptions([5, 10, 50, 100])}
                    </select>
                    <button
                        className="input input-small"
                        onClick={(): Promise<void> =>
                            this.props.dispatch(updateMedia('tv', Control.getInputValue(this.updateTvCount.current)))
                        }>
                        Run
                    </button>
                </div>
                <hr className="divider" />
                <div className="admin-list text text-left">
                    <span className="truncate">Update IATA airline entries</span>
                    <span />
                    <button className="input input-small" onClick={(): Promise<void> => this.props.dispatch(updateIata('airlines'))}>
                        Run
                    </button>
                    <span className="truncate">Update IATA location entries</span>
                    <span />
                    <button className="input input-small" onClick={(): Promise<void> => this.props.dispatch(updateIata('locations'))}>
                        Run
                    </button>
                </div>
                <hr className="divider" />
                <div className="admin-list text text-left">
                    <span className="truncate">Clear all log messages</span>
                    <span />
                    <button className="input input-small" onClick={(): Promise<void> => this.props.dispatch(clearLogs())}>
                        Clear
                    </button>
                    <span className="truncate">Default number of log messages</span>
                    <select className="input input-small" defaultValue="25" ref={this.logCount}>
                        {Control.renderOptions([10, 25, 50, 100, 250, 500])}
                    </select>
                    <button
                        className="input input-small"
                        onClick={(): Promise<void> => this.props.dispatch(getLogs(Control.getInputValue(this.logCount.current)))}>
                        Load
                    </button>
                </div>
            </>
        );
    }
}

export default connect((state: DefaultState): ControlProps => ({ stats: state.admin.stats }))(Control);
