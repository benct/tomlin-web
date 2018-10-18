import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { ArrowIcon } from './icons.jsx';

export class Pagination extends React.Component {
    render() {
        const prevPage = this.props.current > 1 ? this.props.current - 1 : 1;
        const nextPage = this.props.current + (this.props.total <= this.props.current ? 0 : 1);

        return this.props.enabled ? (
            <div className="text-center clear ptl">
                <Link to={this.props.path + prevPage} className="button-icon button-text-icon">
                    <ArrowIcon width={18} height={18} />
                    <span>Previous</span>
                </Link>
                <Link to={this.props.path + nextPage} className="button-icon button-text-icon">
                    <span>Next</span>
                    <ArrowIcon width={18} height={18} style={{ transform: 'rotate(180deg)' }} />
                </Link>
            </div>
        ) : null;
    }
}

Pagination.propTypes = {
    path: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};

export default connect(state => ({
    enabled: state.pagination.enabled,
    current: state.pagination.current,
    total: state.pagination.total,
}))(Pagination);
