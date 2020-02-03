import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { DefaultState, ThunkDispatchProp, Visit } from '../../interfaces';
import { getVisits } from '../../actions/admin';
import paginationActions from '../../actions/pagination';

import Pagination from '../page/Pagination';

interface VisitProps {
    visits?: Visit[];
    isLoggedIn: boolean;
    page: number;
}

const Visits: React.FC<VisitProps & ThunkDispatchProp> = ({ visits, page, isLoggedIn, dispatch }) => {
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

    return visits ? (
        <>
            {visits.map(renderVisit)}
            <Pagination path="/admin/visits/" />
        </>
    ) : (
        <span>No tracking data found...</span>
    );
};

export default connect(
    (state: DefaultState, ownProps: RouteComponentProps<{ page?: string }>): VisitProps => ({
        visits: state.admin.visits?.results,
        isLoggedIn: state.auth.isLoggedIn,
        page: Number(ownProps.match.params.page ?? 1),
    })
)(Visits);
