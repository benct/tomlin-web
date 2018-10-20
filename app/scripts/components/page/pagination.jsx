import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { LastIcon, NextIcon } from './icons.jsx';

export class Pagination extends React.Component {
    renderPage(page, child) {
        return (
            <Link to={this.props.path + page} className="button-icon" key={`pagination${page}`}>
                {child ? child : <span>{page}</span>}
            </Link>
        );
    }

    render() {
        const { enabled, first, previous, current, next, last, total, previousPages, consecutivePages } = this.props.data;

        return enabled ? (
            <div className="text-center clear ptl">
                {first ? this.renderPage(1, <LastIcon width={18} height={18} style={{ transform: 'rotate(180deg)' }} />) : null}
                {previousPages.length
                    ? this.renderPage(previous, <NextIcon width={18} height={18} style={{ transform: 'rotate(180deg)' }} />)
                    : null}
                <span className="hide-gt480">
                    <span className="valign-middle phm">Page {current}</span>
                </span>
                <span className="hide-lt480 phm">
                    {previousPages.map(page => this.renderPage(page))}
                    <span className="valign-middle phm strong">{current}</span>
                    {consecutivePages.map(page => this.renderPage(page))}
                </span>
                {consecutivePages.length ? this.renderPage(next, <NextIcon width={18} height={18} />) : null}
                {last ? this.renderPage(total, <LastIcon width={18} height={18} />) : null}
            </div>
        ) : null;
    }
}

Pagination.propTypes = {
    path: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
};

export default connect(state => ({ data: state.pagination }))(Pagination);
