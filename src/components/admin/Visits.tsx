import { FC, ReactElement } from 'react';

import { useVisits } from '@/data/admin';

import { PageProps, Visit } from '@/interfaces';
import { Loading } from '@/components/page/Loading';
import { Pagination } from '@/components/page/Pagination';

export const Visits: FC<PageProps> = ({ page }) => {
    const { visits, pagination, loading } = useVisits(page);

    const renderVisit = (visit: Visit, idx: number): ReactElement => (
        <div className="admin-logs" key={`visits${idx}`}>
            <code>
                {visit.timestamp}
                <br />
                <span className="strong">{visit.visits}</span>
            </code>
            <code>
                {visit.ip} / {visit.host}
                <br />
                {visit.agent}
                <br />
                {visit.page} {visit.referer}
            </code>
        </div>
    );

    return (
        <div className="wrapper min-height ptm">
            <Loading isLoading={loading} text="Loading visits...">
                {visits.length ? (
                    <>
                        {visits.map(renderVisit)}
                        <Pagination current={pagination.current} total={pagination.total} path="/admin/visits/" />
                    </>
                ) : (
                    <span>No tracking data found...</span>
                )}
            </Loading>
        </div>
    );
};
