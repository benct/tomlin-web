import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { DefaultState, Log, ThunkDispatchProp } from '../../interfaces';
import { deleteLog, getLogs } from '../../actions/admin';
import paginationActions from '../../actions/pagination';

import Pagination from '../page/Pagination';

interface LogProps {
    logs?: Log[];
    page: number;
    isLoggedIn: boolean;
}

const Logs: React.FC<LogProps & ThunkDispatchProp> = ({ logs, page, isLoggedIn, dispatch }) => {
    useEffect(() => {
        dispatch(getLogs(page));
        window.scrollTo(0, 0);

        dispatch(paginationActions.set(page));

        return (): void => {
            dispatch(paginationActions.reset());
        };
    }, [page, isLoggedIn]);

    const renderLog = (log: Log, idx: number): React.ReactElement => (
        <div className="admin-logs" key={`logs${idx}`}>
            <code onClick={(): Promise<void> => dispatch(deleteLog(log.id, page))} role="button" tabIndex={0}>
                {log.timestamp}
            </code>
            <code>
                {log.message}
                {log.details && (
                    <>
                        <br />* {log.details}
                    </>
                )}
                {log.path && (
                    <>
                        <br />* {log.path}
                    </>
                )}
            </code>
        </div>
    );

    return logs ? (
        <>
            {logs.map(renderLog)}
            <Pagination path="/admin/logs/" />
        </>
    ) : (
        <span>Server log is empty...</span>
    );
};

export default connect(
    (state: DefaultState, ownProps: RouteComponentProps<{ page?: string }>): LogProps => ({
        logs: state.admin.logs?.results,
        isLoggedIn: state.auth.isLoggedIn,
        page: Number(ownProps.match.params.page ?? 1),
    })
)(Logs);
