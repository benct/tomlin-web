import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { DefaultState, PaginationState } from '../../interfaces';

interface PaginationProps {
    path: string;
    postfix?: string;
}

interface PaginationImage {
    name: string;
    alt: string;
    rotate?: boolean;
}

class Pagination extends React.PureComponent<PaginationState & PaginationProps> {
    static renderImage(name: string, alt: string, rotate?: boolean): React.ReactElement {
        return (
            <img
                className="valign-middle"
                src={require(`../../../images/icon/${name}.svg`)}
                alt={alt}
                width={18}
                height={18}
                style={rotate ? { transform: 'rotate(180deg)' } : {}}
            />
        );
    }

    renderPage(page: number, image?: PaginationImage): React.ReactElement {
        return (
            <Link to={this.props.path + page + (this.props.postfix || '')} className="button-icon" key={`pagination${page}`}>
                {image ? Pagination.renderImage(image.name, image.alt, image.rotate) : <span>{page}</span>}
            </Link>
        );
    }

    render(): React.ReactNode {
        const { enabled, first, previous, current, next, last, total, previousPages, consecutivePages } = this.props;

        return enabled ? (
            <div className="text-center clear ptl">
                {first ? this.renderPage(1, { name: 'last', alt: 'First page', rotate: true }) : null}
                {previousPages.length ? this.renderPage(previous, { name: 'next', alt: 'Previous page', rotate: true }) : null}
                <span className="hide-gt480">
                    <span className="valign-middle phm">Page {current}</span>
                </span>
                <span className="hide-lt480 phm">
                    {previousPages.map((page: number): React.ReactElement => this.renderPage(page))}
                    <span className="valign-middle phm strong">{current}</span>
                    {consecutivePages.map((page: number): React.ReactElement => this.renderPage(page))}
                </span>
                {consecutivePages.length ? this.renderPage(next, { name: 'next', alt: 'Next page' }) : null}
                {last ? this.renderPage(total, { name: 'last', alt: 'Last page' }) : null}
            </div>
        ) : null;
    }
}

export default connect((state: DefaultState): PaginationState => ({ ...state.pagination }))(Pagination);
