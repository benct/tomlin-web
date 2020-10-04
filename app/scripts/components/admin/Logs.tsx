import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { DefaultState, Log } from '../../interfaces';
import { deleteLog, getLogs } from '../../actions/admin';
import paginationActions from '../../actions/pagination';

import { Loading } from '../page/Loading';
import { Pagination } from '../page/Pagination';

interface LogState {
    logs: Log[];
    loading: boolean;
    isLoggedIn: boolean;
}

export const Logs: React.FC = () => {
    const routeParams = useParams<{ page?: string }>();
    const page = Number(routeParams.page ?? 1);

    const dispatch = useDispatch();
    const { logs, loading, isLoggedIn } = useSelector<DefaultState, LogState>((state) => ({
        logs: state.admin.logs?.results ?? [],
        loading: state.loading,
        isLoggedIn: state.auth.isLoggedIn,
    }));

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
            <code onClick={() => dispatch(deleteLog(log.id))} role="button" tabIndex={0}>
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
