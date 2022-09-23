import { FC, ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { DefaultState, Visit } from '../../interfaces';
import { getVisits } from '../../actions/admin';
import paginationActions from '../../actions/pagination';

import { Loading } from '../page/Loading';
import { Pagination } from '../page/Pagination';

export const Visits: FC = () => {
    const router = useRouter();
    const page = Number(router.query.page?.[0] ?? 1);

    const dispatch = useDispatch();
    const loading = useSelector<DefaultState, DefaultState['loading']>((state) => state.loading);
    const visits = useSelector<DefaultState, Visit[]>((state) => state.admin.visits?.results ?? []);

    useEffect(() => {
        dispatch(getVisits(page));
        window.scrollTo(0, 0);

        dispatch(paginationActions.set(page));

        return (): void => {
            dispatch(paginationActions.reset());
        };
    }, [dispatch, page]);

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
                        <Pagination path="/admin/visits/" />
                    </>
                ) : (
                    <span>No tracking data found...</span>
                )}
            </Loading>
        </div>
    );
};
