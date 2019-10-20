import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { DefaultState, Log, ThunkDispatchProp } from '../../interfaces';
import { getLogs } from '../../actions/admin';

interface LogProps {
    logs: Log[];
    isLoggedIn: boolean;
}

const Logs: React.FC<LogProps & ThunkDispatchProp> = ({ logs, isLoggedIn, dispatch }) => {
    useEffect(() => {
        if (!logs.length) {
            dispatch(getLogs(25));
        }
    }, [isLoggedIn]);

    const renderLog = (log: Log, idx: number): React.ReactElement => (
        <div className="admin-logs" key={`logs${idx}`}>
            <code>{log.timestamp}</code>
            <code>
                {log.message}
                <br />
                {log.details}
            </code>
        </div>
    );

    return logs.length ? <>{logs.map(renderLog)}</> : <span>Server log is empty...</span>;
};

export default connect((state: DefaultState): LogProps => ({ logs: state.admin.logs, isLoggedIn: state.auth.isLoggedIn }))(Logs);
