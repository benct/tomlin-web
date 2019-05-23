import React from 'react';
import { connect, DispatchProp } from 'react-redux';

import { DefaultState, Visit } from '../../interfaces';
import adminActions from '../../actions/admin.js';

interface VisitProps {
    visits: Visit[];
}

class Visits extends React.PureComponent<VisitProps & DispatchProp> {
    componentDidMount(): void {
        if (!this.props.visits.length) {
            this.props.dispatch(adminActions.getVisits());
        }
    }

    static renderVisit(visit: Visit, idx: number): React.ReactElement {
        return (
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
    }

    render(): React.ReactElement[] | React.ReactElement {
        return this.props.visits.length ? this.props.visits.map(Visits.renderVisit) : <span>No tracking data found...</span>;
    }
}

export default connect((state: DefaultState): VisitProps => ({ visits: state.admin.visits }))(Visits);
