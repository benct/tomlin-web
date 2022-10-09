import { FC, Fragment, ReactElement } from 'react';

import { formatTimestamp } from '@/util/formatting';
import { useVisits } from '@/data/admin';

import { PageProps, Visit } from '@/interfaces';
import { Loading } from '@/components/page/Loading';
import { Pagination } from '@/components/page/Pagination';
import { Box } from '@/components/page/Box';

export const Visits: FC<PageProps> = ({ page }) => {
    const { visits, pagination, loading } = useVisits(page);

    const renderVisit = (visit: Visit, idx: number): ReactElement => (
        <Fragment key={`visits${idx}`}>
            <code>
                {formatTimestamp(visit.timestamp)}
                <br />
                <span className="font-bold text-secondary dark:text-secondary-dark">{visit.visits}</span>
            </code>
            <code>
                {visit.ip} / {visit.host}
                <br />
                {visit.agent}
                <br />
                {visit.page} {visit.referer}
            </code>
        </Fragment>
    );

    return (
        <Box title="Visits" className="min-h">
            <Loading isLoading={loading} text="Loading visits...">
                {visits.length ? (
                    <>
                        <div className="grid grid-cols-2-auto gap-12 text-12">{visits.map(renderVisit)}</div>
                        <Pagination current={pagination.current} total={pagination.total} path="/admin/visits/" />
                    </>
                ) : (
                    <div className="text-center">No tracking data found...</div>
                )}
            </Loading>
        </Box>
    );
};
