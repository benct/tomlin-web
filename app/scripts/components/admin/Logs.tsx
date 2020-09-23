import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { DefaultState, Log, ThunkDispatchProp } from '../../interfaces';
import { deleteLog, getLogs } from '../../actions/admin';
import paginationActions from '../../actions/pagination';

import Pagination from '../page/Pagination';
import Loading from '../page/Loading';

interface LogProps {
    logs: Log[];
    loading: boolean;
    isLoggedIn: boolean;
}

const Logs: React.FC<LogProps & ThunkDispatchProp> = ({ logs, loading, isLoggedIn, dispatch }) => {
    const routeParams = useParams<{ page?: string }>();
    const page = Number(routeParams.page ?? 1);

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
                {log.details && <div>{log.details}</div>}
                {log.path && <div>{log.path}</div>}
            </code>
        </div>
    );

    return (
        <Loading isLoading={loading} text="Loading logs...">
            {logs.length ? (
                <>
                    {logs.map(renderLog)}
                    <Pagination path="/admin/logs/" />
                </>
            ) : (
                <span>Server logs are empty...</span>
            )}
        </Loading>
    );
};

export default connect(
    (state: DefaultState): LogProps => ({
        logs: state.admin.logs?.results ?? [],
        loading: state.loading,
        isLoggedIn: state.auth.isLoggedIn,
    })
)(Logs);
