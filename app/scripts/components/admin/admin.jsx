import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { formatThousands } from '../../util/formatting.js';
import adminActions from '../../actions/admin.js';

class Admin extends React.PureComponent {
    constructor(props) {
        super(props);

        this.logCount = React.createRef();
        this.updateMovieCount = React.createRef();
        this.updateTvCount = React.createRef();
    }

    componentDidMount() {
        if (!this.props.logs.length) {
            this.props.dispatch(adminActions.stats());
        }
    }

    formatStat(key) {
        return formatThousands(this.props.stats[key] || '-');
    }

    static renderOptions(values) {
        return values.map((opt, idx) => (
            <option key={`opt${idx}`} value={opt}>
                {opt}
            </option>
        ));
    }

    static renderLog(log, idx) {
        return (
            <div className="admin-logs" key={`logs${idx}`}>
                <code>{log.timestamp}</code>
                <code>
                    {log.message}
                    <br />
                    {log.details}
                </code>
            </div>
        );
    }

    render() {
        return (
            <>
                <div className="wrapper admin-stats text-center text-small">
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
                <hr />
                <div className="wrapper admin-list text text-left">
                    <span className="truncate">Import missing media poster images</span>
                    <span />
                    <button
                        className="button-default button-default-small"
                        onClick={() => this.props.dispatch(adminActions.updatePosters())}>
                        Run
                    </button>
                    <span className="truncate">Update number of stored movies</span>
                    <select className="input-small" defaultValue={50} ref={this.updateMovieCount}>
                        {Admin.renderOptions([10, 50, 100, 250, 500])}
                    </select>
                    <button
                        className="button-default button-default-small"
                        onClick={() => this.props.dispatch(adminActions.updateMedia('movie', this.updateMovieCount.current.value))}>
                        Run
                    </button>
                    <span className="truncate">Update number of stored tv-shows</span>
                    <select className="input-small" defaultValue={10} ref={this.updateTvCount}>
                        {Admin.renderOptions([5, 10, 50, 100])}
                    </select>
                    <button
                        className="button-default button-default-small"
                        onClick={() => this.props.dispatch(adminActions.updateMedia('tv', this.updateTvCount.current.value))}>
                        Run
                    </button>
                </div>
                <hr />
                <div className="wrapper admin-list text text-left">
                    <span className="truncate">Update IATA airline entries</span>
                    <span />
                    <button
                        className="button-default button-default-small"
                        onClick={() => this.props.dispatch(adminActions.updateIata('airlines'))}>
                        Run
                    </button>
                    <span className="truncate">Update IATA location entries</span>
                    <span />
                    <button
                        className="button-default button-default-small"
                        onClick={() => this.props.dispatch(adminActions.updateIata('locations'))}>
                        Run
                    </button>
                </div>
                <hr />
                <div className="wrapper admin-list text text-left">
                    <span className="truncate">Clear all log messages</span>
                    <span />
                    <button className="button-default button-default-small" onClick={() => this.props.dispatch(adminActions.clearLogs())}>
                        Clear
                    </button>
                    <span className="truncate">Show number of log messages</span>
                    <select className="input-small" defaultValue={25} ref={this.logCount}>
                        {Admin.renderOptions([10, 25, 50, 100, 250, 500])}
                    </select>
                    <button
                        className="button-default button-default-small"
                        onClick={() => this.props.dispatch(adminActions.getLogs(this.logCount.current.value))}>
                        Load
                    </button>
                </div>
                <hr />
                <div className="wrapper">
                    {this.props.logs.length ? this.props.logs.map(Admin.renderLog) : <span>Server log is empty...</span>}
                </div>
            </>
        );
    }
}

Admin.propTypes = {
    dispatch: PropTypes.func.isRequired,
    logs: PropTypes.array.isRequired,
    stats: PropTypes.object.isRequired,
};

export default connect(state => ({ logs: state.admin.logs, stats: state.admin.stats }))(Admin);
