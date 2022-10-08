import { FC, ReactElement } from 'react';

import { useLogs } from '@/data/admin';

import { Log, PageProps } from '@/interfaces';
import { Loading } from '@/components/page/Loading';
import { Pagination } from '@/components/page/Pagination';

export const Logs: FC<PageProps> = ({ page }) => {
    const { logs, pagination, loading, deleteLog } = useLogs(page);

    const renderLog = (log: Log, idx: number): ReactElement => (
        <div className="admin-logs" key={`logs${idx}`}>
            <code onClick={() => deleteLog(log.id)} role="button" tabIndex={0}>
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
                        <Pagination current={pagination.current} total={pagination.total} path="/admin/logs/" />
                    </>
                ) : (
                    <span>Server logs are empty...</span>
                )}
            </Loading>
        </div>
    );
};
