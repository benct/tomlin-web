import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from '@mdi/react';
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

export const Pagination: React.FC<PaginationProps> = ({ path, postfix }) => {
    const { enabled, first, previous, current, next, last, total, previousPages, consecutivePages } = useSelector<
        DefaultState,
        PaginationState
    >((state) => ({ ...state.pagination }));

    const renderImage = (image: PaginationImage): React.ReactElement => (
        <Icon
            path={image.double ? mdiChevronDoubleRight : mdiChevronRight}
            rotate={image.rotate ? 180 : 0}
            size={1}
            title={image.title}
            className="valign-middle"
        />
    );

    const renderPage = (page: number, image?: PaginationImage): React.ReactElement => (
        <Link to={path + page + (postfix ? `/${postfix}` : '')} className="button-icon phm" key={`pagination${page}`}>
            {image ? renderImage(image) : <span>{page}</span>}
        </Link>
    );

    return enabled ? (
        <div className="text-center clear ptl">
            {first ? renderPage(1, { title: 'First page', double: true, rotate: true }) : null}
            {previousPages.length ? renderPage(previous, { title: 'Previous page', rotate: true }) : null}
            <span className="hide-gt480">
                <span className="valign-middle phm">Page {current}</span>
            </span>
            <span className="hide-lt480 phm">
                {previousPages.map((page: number): React.ReactElement => renderPage(page))}
                <span className="valign-middle phm strong">{current}</span>
                {consecutivePages.map((page: number): React.ReactElement => renderPage(page))}
            </span>
            {consecutivePages.length ? renderPage(next, { title: 'Next page' }) : null}
            {last ? renderPage(total, { title: 'Last page', double: true }) : null}
        </div>
    ) : null;
};
