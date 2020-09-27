import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { DefaultState, Visit } from '../../interfaces';
import { getVisits } from '../../actions/admin';
import paginationActions from '../../actions/pagination';

import Pagination from '../page/Pagination';
import Loading from '../page/Loading';

interface VisitState {
    visits: Visit[];
    loading: boolean;
    isLoggedIn: boolean;
}

const Visits: React.FC = () => {
    const routeParams = useParams<{ page?: string }>();
    const page = Number(routeParams.page ?? 1);

    const dispatch = useDispatch();
    const { visits, loading, isLoggedIn } = useSelector<DefaultState, VisitState>((state) => ({
        visits: state.admin.visits?.results ?? [],
        loading: state.loading,
        isLoggedIn: state.auth.isLoggedIn,
    }));

    useEffect(() => {
        dispatch(getVisits(page));
        window.scrollTo(0, 0);

        dispatch(paginationActions.set(page));

        return (): void => {
            dispatch(paginationActions.reset());
        };
    }, [page, isLoggedIn]);

    const renderVisit = (visit: Visit, idx: number): React.ReactElement => (
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
    );
};

export default Visits;
