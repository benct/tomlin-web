import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import adminActions from '../../actions/admin.js';

class Visits extends React.PureComponent {
    componentDidMount() {
        if (!this.props.visits.length) {
            this.props.dispatch(adminActions.getVisits());
        }
    }

    static renderVisit(visit, idx) {
        return (
            <div className="admin-logs" key={`visits${idx}`}>
                <code>
                    {visit.timestamp}
                    <br />
                    {visit.visits}
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

    render() {
        return this.props.visits.length ? this.props.visits.map(Visits.renderVisit) : <span>No tracking data found...</span>;
    }
}

Visits.propTypes = {
    dispatch: PropTypes.func.isRequired,
    visits: PropTypes.array.isRequired,
};

export default connect(state => ({ visits: state.admin.visits }))(Visits);
