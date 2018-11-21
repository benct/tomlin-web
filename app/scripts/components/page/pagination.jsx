import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class Pagination extends React.PureComponent {
    renderImage(name, alt, rotate) {
        return (
            <img
                className="valign-middle"
                src={require(`../../../images/icon/${name}.svg`)}
                alt={alt}
                width={18}
                height={18}
                style={rotate ? { transform: 'rotate(180deg)' } : null}
            />
        );
    }

    renderPage(page, image) {
        return (
            <Link to={this.props.path + page + (this.props.postfix || '')} className="button-icon" key={`pagination${page}`}>
                {image ? this.renderImage(image.name, image.alt, image.rotate) : <span>{page}</span>}
            </Link>
        );
    }

    render() {
        const { enabled, first, previous, current, next, last, total, previousPages, consecutivePages } = this.props.data;

        return enabled ? (
            <div className="text-center clear ptl">
                {first ? this.renderPage(1, { name: 'last', alt: 'First page', rotate: true }) : null}
                {previousPages.length ? this.renderPage(previous, { name: 'next', alt: 'Previous page', rotate: true }) : null}
                <span className="hide-gt480">
                    <span className="valign-middle phm">Page {current}</span>
                </span>
                <span className="hide-lt480 phm">
                    {previousPages.map(page => this.renderPage(page))}
                    <span className="valign-middle phm strong">{current}</span>
                    {consecutivePages.map(page => this.renderPage(page))}
                </span>
                {consecutivePages.length ? this.renderPage(next, { name: 'next', alt: 'Next page' }) : null}
                {last ? this.renderPage(total, { name: 'last', alt: 'Last page' }) : null}
            </div>
        ) : null;
    }
}

Pagination.propTypes = {
    path: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    postfix: PropTypes.any,
};

export default connect(state => ({ data: state.pagination }))(Pagination);
