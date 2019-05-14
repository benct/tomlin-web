import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { DefaultState, Log } from '../../interfaces';
import adminActions from '../../actions/admin.js';

interface LogProps {
    dispatch: Dispatch;
    logs: Log[];
}

class Logs extends React.PureComponent<LogProps> {
    componentDidMount(): void {
        if (!this.props.logs.length) {
            this.props.dispatch(adminActions.getLogs(25));
        }
    }

    static renderLog(log: Log, idx: number): React.ReactElement {
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

    render(): React.ReactElement[] | React.ReactElement {
        return this.props.logs.length ? this.props.logs.map(Logs.renderLog) : <span>Server log is empty...</span>;
    }
}

export default connect((state: DefaultState): object => ({ logs: state.admin.logs }))(Logs);