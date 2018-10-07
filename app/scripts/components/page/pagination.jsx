import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ArrowIcon } from './icons.jsx';

export default class Pagination extends React.Component {
    render() {
        const currentPage = this.props.currentPage || 1;
        const prevPage = currentPage > 1 ? currentPage - 1 : 1;
        const nextPage = currentPage + 1;

        return (
            <div className="text-center clear ptl">
                <Link to={this.props.basePath + prevPage} className="button-icon button-text-icon">
                    <ArrowIcon width={18} height={18} />
                    <span>Previous</span>
                </Link>
                <Link to={this.props.basePath + nextPage} className="button-icon button-text-icon">
                    <span>Next</span>
                    <ArrowIcon width={18} height={18} style={{ transform: 'rotate(180deg)' }} />
                </Link>
            </div>
        );
    }
}

Pagination.propTypes = {
    basePath: PropTypes.string.isRequired,
    currentPage: PropTypes.number,
};
