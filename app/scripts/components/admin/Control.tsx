import React from 'react';
import { connect, DispatchProp } from 'react-redux';

import { DefaultState, AdminStats } from '../../interfaces';
import { formatThousands } from '../../util/formatting';
import adminActions from '../../actions/admin';

interface ControlProps {
    stats: AdminStats;
}

class Control extends React.PureComponent<ControlProps & DispatchProp> {
    logCount: React.RefObject<HTMLSelectElement>;
    updateMovieCount: React.RefObject<HTMLSelectElement>;
    updateTvCount: React.RefObject<HTMLSelectElement>;

    constructor(props: ControlProps & DispatchProp) {
        super(props);

        this.logCount = React.createRef();
        this.updateMovieCount = React.createRef();
        this.updateTvCount = React.createRef();
    }

    componentDidMount(): void {
        if (!this.props.stats.log) {
            this.props.dispatch(adminActions.getStats());
        }
    }

    formatStat(key: string): string {
        return this.props.stats[key] ? formatThousands(this.props.stats[key]) : '-';
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
                    <button
                        className="button-default button-default-small"
                        onClick={(): void => this.props.dispatch(adminActions.updatePosters())}>
                        Run
                    </button>
                    <span className="truncate">Update number of stored movies</span>
                    <select className="input-small" defaultValue="50" ref={this.updateMovieCount}>
                        {Control.renderOptions([10, 50, 100, 250, 500])}
                    </select>
                    <button
                        className="button-default button-default-small"
                        onClick={(): void =>
                            this.props.dispatch(
                                adminActions.updateMedia('movie', this.updateMovieCount.current && this.updateMovieCount.current.value)
                            )
                        }>
                        Run
                    </button>
                    <span className="truncate">Update number of stored tv-shows</span>
                    <select className="input-small" defaultValue="10" ref={this.updateTvCount}>
                        {Control.renderOptions([5, 10, 50, 100])}
                    </select>
                    <button
                        className="button-default button-default-small"
                        onClick={(): void =>
                            this.props.dispatch(
                                adminActions.updateMedia('tv', this.updateTvCount.current && this.updateTvCount.current.value)
                            )
                        }>
                        Run
                    </button>
                </div>
                <hr className="divider" />
                <div className="admin-list text text-left">
                    <span className="truncate">Update IATA airline entries</span>
                    <span />
                    <button
                        className="button-default button-default-small"
                        onClick={(): void => this.props.dispatch(adminActions.updateIata('airlines'))}>
                        Run
                    </button>
                    <span className="truncate">Update IATA location entries</span>
                    <span />
                    <button
                        className="button-default button-default-small"
                        onClick={(): void => this.props.dispatch(adminActions.updateIata('locations'))}>
                        Run
                    </button>
                </div>
                <hr className="divider" />
                <div className="admin-list text text-left">
                    <span className="truncate">Clear all log messages</span>
                    <span />
                    <button
                        className="button-default button-default-small"
                        onClick={(): void => this.props.dispatch(adminActions.clearLogs())}>
                        Clear
                    </button>
                    <span className="truncate">Default number of log messages</span>
                    <select className="input-small" defaultValue="25" ref={this.logCount}>
                        {Control.renderOptions([10, 25, 50, 100, 250, 500])}
                    </select>
                    <button
                        className="button-default button-default-small"
                        onClick={(): void =>
                            this.props.dispatch(adminActions.getLogs(this.logCount.current && this.logCount.current.value))
                        }>
                        Load
                    </button>
                </div>
            </>
        );
    }
}

export default connect((state: DefaultState): ControlProps => ({ stats: state.admin.stats }))(Control);
