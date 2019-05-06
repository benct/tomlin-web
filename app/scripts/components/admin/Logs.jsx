import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import adminActions from '../../actions/admin.js';

class Logs extends React.PureComponent {
    componentDidMount() {
        if (!this.props.logs.length) {
            this.props.dispatch(adminActions.getLogs(25));
        }
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
        return this.props.logs.length ? this.props.logs.map(Logs.renderLog) : <span>Server log is empty...</span>;
    }
}

Logs.propTypes = {
    dispatch: PropTypes.func.isRequired,
    logs: PropTypes.array.isRequired,
};

export default connect(state => ({ logs: state.admin.logs }))(Logs);
