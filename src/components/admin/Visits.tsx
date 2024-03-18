import { Fragment, useState } from 'react';
import { mdiSortClockDescendingOutline, mdiSortNumericDescending } from '@mdi/js';

import { formatTimestamp } from '@/util/formatting';
import { useVisits } from '@/data/admin';

import { PageProps, Visit } from '@/interfaces';
import { Loading } from '@/components/page/Loading';
import { Pagination } from '@/components/page/Pagination';
import { Box } from '@/components/page/Box';
import { Button } from '@/components/page/Button';

export const Visits = ({ page }: PageProps) => {
    const [sort, setSort] = useState<string>('count');
    const { visits, pagination, loading } = useVisits(page, sort);

    const toggleSort = () => {
        if (sort === 'count') {
            setSort('date');
        } else {
            setSort('count');
        }
    };

    const renderVisit = (visit: Visit, idx: number) => (
        <Fragment key={`visits${idx}`}>
            <code>
                <span className="text-neutral dark:text-neutral-dark">{formatTimestamp(visit.timestamp)}</span>
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
                        <Button
                            text={`Sort by ${sort}`}
                            icon={sort === 'count' ? mdiSortNumericDescending : mdiSortClockDescendingOutline}
                            onClick={toggleSort}
                            className="float-right -mt-40"
                        />
                        <div className="grid grid-cols-auto-1fr gap-12 text-12">{visits.map(renderVisit)}</div>
                        <Pagination current={pagination.current} total={pagination.total} path="/admin/visits/" />
                    </>
                ) : (
                    <div className="text-center">No tracking data found...</div>
                )}
            </Loading>
        </Box>
    );
};
