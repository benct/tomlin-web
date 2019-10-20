import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { DefaultState, ThunkDispatchProp, Visit } from '../../interfaces';
import { getVisits } from '../../actions/admin';

interface VisitProps {
    visits: Visit[];
    isLoggedIn: boolean;
}

const Visits: React.FC<VisitProps & ThunkDispatchProp> = ({ visits, isLoggedIn, dispatch }) => {
    useEffect(() => {
        if (!visits.length) {
            dispatch(getVisits());
        }
    }, [isLoggedIn]);

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

    return visits.length ? <>{visits.map(renderVisit)}</> : <span>No tracking data found...</span>;
};

export default connect((state: DefaultState): VisitProps => ({ visits: state.admin.visits, isLoggedIn: state.auth.isLoggedIn }))(Visits);
