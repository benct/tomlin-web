import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import adminActions from '../../actions/admin.js';

const defaultNumberOfLogs = 10;

class Admin extends React.PureComponent {
    constructor(props) {
        super(props);

        this.updateMovieCount = React.createRef();
        this.updateTvCount = React.createRef();
    }

    componentDidMount() {
        if (!this.props.logs.length) {
            this.props.dispatch(adminActions.getLogs(defaultNumberOfLogs));
        }
    }

    render() {
        return (
            <>
                <div className="wrapper admin-list admin-list-ext">
                    <span className="truncate">Import missing media poster images</span>
                    <span />
                    <button
                        className="button-default button-default-small"
                        onClick={() => this.props.dispatch(adminActions.updatePosters())}>
                        Import
                    </button>
                    <span className="truncate">Run update script (movies)</span>
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
                        Update
                    </button>
                    <span className="truncate">Run update script (tv-shows)</span>
                    <select defaultValue={10} ref={this.updateTvCount}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <button
                        className="button-default button-default-small"
                        onClick={() => this.props.dispatch(adminActions.updateMedia('tv', this.updateTvCount.current.value))}>
                        Update
                    </button>
                </div>
                <hr />
                <div className="wrapper admin-list">
                    <span className="truncate">Clear all log messages</span>
                    <button className="button-default button-default-small" onClick={() => this.props.dispatch(adminActions.clearLogs())}>
                        Clear
                    </button>
                    <span className="truncate">Show number of log messages</span>
                    <select
                        defaultValue={defaultNumberOfLogs}
                        onChange={event => event.target.blur()}
                        onBlur={event => this.props.dispatch(adminActions.getLogs(event.target.value))}>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={250}>250</option>
                        <option value={500}>500</option>
                    </select>
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
