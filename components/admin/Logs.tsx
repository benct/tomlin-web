import { FC, ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { DefaultState, Log } from '../../interfaces';
import { deleteLog, getLogs } from '../../actions/admin';
import paginationActions from '../../actions/pagination';

import { Loading } from '../page/Loading';
import { Pagination } from '../page/Pagination';

export const Logs: FC = () => {
    const router = useRouter();
    const page = Number(router.query.page?.[0] ?? 1);

    const dispatch = useDispatch();
    const loading = useSelector<DefaultState, DefaultState['loading']>((state) => state.loading);
    const logs = useSelector<DefaultState, Log[]>((state) => state.admin.logs?.results ?? []);

    useEffect(() => {
        dispatch(getLogs(page));
        window.scrollTo(0, 0);

        dispatch(paginationActions.set(page));

        return (): void => {
            dispatch(paginationActions.reset());
        };
    }, [dispatch, page]);

    const renderLog = (log: Log, idx: number): ReactElement => (
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
        <div className="wrapper min-height ptm">
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
        </div>
    );
};
