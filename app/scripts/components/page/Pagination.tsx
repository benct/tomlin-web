import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiChevronDoubleRight, mdiChevronRight } from '@mdi/js';

import { DefaultState, PaginationState } from '../../interfaces';

interface PaginationProps {
    path: string;
    postfix?: string;
}

interface PaginationImage {
    title: string;
    double?: boolean;
    rotate?: boolean;
}

class Pagination extends React.PureComponent<PaginationState & PaginationProps> {
    static renderImage(image: PaginationImage): React.ReactElement {
        return (
            <Icon
                path={image.double ? mdiChevronDoubleRight : mdiChevronRight}
                rotate={image.rotate ? 180 : 0}
                size={1}
                title={image.title}
                className="valign-middle"
            />
        );
    }

    renderPage(page: number, image?: PaginationImage): React.ReactElement {
        const postfix = this.props.postfix ? `/${this.props.postfix}` : '';
        return (
            <Link to={this.props.path + page + postfix} className="button-icon" key={`pagination${page}`}>
                {image ? Pagination.renderImage(image) : <span>{page}</span>}
            </Link>
        );
    }

    render(): React.ReactNode {
        const { enabled, first, previous, current, next, last, total, previousPages, consecutivePages } = this.props;

        return enabled ? (
            <div className="text-center clear ptl">
                {first ? this.renderPage(1, { title: 'First page', double: true, rotate: true }) : null}
                {previousPages.length ? this.renderPage(previous, { title: 'Previous page', rotate: true }) : null}
                <span className="hide-gt480">
                    <span className="valign-middle phm">Page {current}</span>
                </span>
                <span className="hide-lt480 phm">
                    {previousPages.map((page: number): React.ReactElement => this.renderPage(page))}
                    <span className="valign-middle phm strong">{current}</span>
                    {consecutivePages.map((page: number): React.ReactElement => this.renderPage(page))}
                </span>
                {consecutivePages.length ? this.renderPage(next, { title: 'Next page' }) : null}
                {last ? this.renderPage(total, { title: 'Last page', double: true }) : null}
            </div>
        ) : null;
    }
}

export default connect((state: DefaultState): PaginationState => ({ ...state.pagination }))(Pagination);
