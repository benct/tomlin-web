import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mediaActions from '../../actions/media.js';
import adminActions from '../../actions/admin.js';

const defaultNumberOfLogs = 10;

class Admin extends React.PureComponent {
    componentDidMount() {
        if (!this.props.logs.length) {
            this.props.dispatch(adminActions.getLogs(defaultNumberOfLogs));
        }
    }

    render() {
        return (
            <>
                <div className="wrapper admin-list">
                    <span>Import missing media poster images</span>
                    <button
                        className="button-default button-default-small"
                        onClick={() => this.props.dispatch(mediaActions.updatePosters())}>
                        Run
                    </button>
                    <span>Number of log messages</span>
                    <select
                        defaultValue={defaultNumberOfLogs}
                        onChange={event => event.target.blur()}
                        onBlur={event => this.props.dispatch(adminActions.getLogs(event.target.value))}>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
                <hr />
                <div className="wrapper">
                    {this.props.logs.map((log, idx) => (
                        <div className="admin-logs" key={`logs${idx}`}>
                            <code>{log.timestamp}</code>
                            <code>
                                {log.message}
                                <br />
                                {log.details}
                            </code>
                        </div>
                    ))}
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
