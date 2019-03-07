import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
            this.props.dispatch(adminActions.getLogs(25));
        }
    }

    render() {
        return (
            <>
                <div className="wrapper admin-list">
                    <span className="truncate">Import missing media poster images</span>
                    <span />
                    <button
                        className="button-default button-default-small"
                        onClick={() => this.props.dispatch(adminActions.updatePosters())}>
                        Run
                    </button>
                    <span className="truncate">Update number of stored movies</span>
                    <select defaultValue={50} ref={this.updateMovieCount}>
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={250}>250</option>
                        <option value={500}>500</option>
                    </select>
                    <button
                        className="button-default button-default-small"
                        onClick={() => this.props.dispatch(adminActions.updateMedia('movie', this.updateMovieCount.current.value))}>
                        Run
                    </button>
                    <span className="truncate">Update number of stored tv-shows</span>
                    <select defaultValue={10} ref={this.updateTvCount}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <button
                        className="button-default button-default-small"
                        onClick={() => this.props.dispatch(adminActions.updateMedia('tv', this.updateTvCount.current.value))}>
                        Run
                    </button>
                </div>
                <hr />
                <div className="wrapper admin-list">
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
                <div className="wrapper admin-list">
                    <span className="truncate">Clear all log messages</span>
                    <span />
                    <button className="button-default button-default-small" onClick={() => this.props.dispatch(adminActions.clearLogs())}>
                        Clear
                    </button>
                    <span className="truncate">Show number of log messages</span>
                    <select defaultValue={25} ref={this.logCount}>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={250}>250</option>
                        <option value={500}>500</option>
                    </select>
                    <button
                        className="button-default button-default-small"
                        onClick={() => this.props.dispatch(adminActions.getLogs(this.logCount.current.value))}>
                        Load
                    </button>
                </div>
                <hr />
                <div className="wrapper">
                    {this.props.logs.length ? (
                        this.props.logs.map((log, idx) => (
                            <div className="admin-logs" key={`logs${idx}`}>
                                <code>{log.timestamp}</code>
                                <code>
                                    {log.message}
                                    <br />
                                    {log.details}
                                </code>
                            </div>
                        ))
                    ) : (
                        <span>Server log is empty...</span>
                    )}
                </div>
            </>
        );
    }
}

Admin.propTypes = {
    dispatch: PropTypes.func.isRequired,
    logs: PropTypes.array.isRequired,
};

export default connect(state => ({ logs: state.admin.logs }))(Admin);
