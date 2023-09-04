import { Fragment } from 'react';

import { formatTimestamp } from '@/util/formatting';
import { useLogs } from '@/data/admin';

import { Log, PageProps } from '@/interfaces';
import { Loading } from '@/components/page/Loading';
import { Pagination } from '@/components/page/Pagination';
import { Box } from '@/components/page/Box';

export const Logs = ({ page }: PageProps) => {
    const { logs, pagination, loading, deleteLog } = useLogs(page);

    const renderLog = (log: Log, idx: number) => (
        <Fragment key={`logs${idx}`}>
            <code onClick={() => deleteLog(log.id)} role="button" tabIndex={0} aria-label="Delete log entry">
                {formatTimestamp(log.timestamp)}
            </code>
            <code>
                {log.message}
                {log.details && <div>{log.details}</div>}
                {log.path && <div>{log.path}</div>}
            </code>
        </Fragment>
    );

    return (
        <Box title="Logs" className="min-h">
            <Loading isLoading={loading} text="Loading logs...">
                {logs.length ? (
                    <>
                        <div className="grid grid-cols-auto-1fr gap-12 text-12">{logs.map(renderLog)}</div>
                        <Pagination current={pagination.current} total={pagination.total} path="/admin/logs/" />
                    </>
                ) : (
                    <div className="text-center">Server logs are empty...</div>
                )}
            </Loading>
        </Box>
    );
};
