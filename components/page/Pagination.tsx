import { FC, ReactElement } from 'react';
import Link from 'next/link';
import { Icon } from '@mdi/react';
import { mdiChevronDoubleRight, mdiChevronRight } from '@mdi/js';

interface PaginationProps {
    current: number;
    total: number;
    path: string;
    postfix?: string;
}

interface PaginationImage {
    title: string;
    double?: boolean;
    rotate?: boolean;
}

const listPreviousPages = (totalPages: number, currentPage: number): number[] => {
    const minPageNr = Math.min(currentPage - 3, totalPages - 5);
    const firstPage = Math.max(minPageNr, 1);
    const previousPages = [];
    for (let i = firstPage; i < currentPage; i++) {
        previousPages.push(i);
    }
    return previousPages;
};

const listConsecutivePages = (totalPages: number, firstPage: number, currentPage: number): number[] => {
    const lastPage = Math.min(totalPages, firstPage + 6);
    const consecutivePages = [];
    for (let i = currentPage + 1; i <= lastPage; i++) {
        consecutivePages.push(i);
    }
    return consecutivePages;
};

export const Pagination: FC<PaginationProps> = ({ current, total, path, postfix }) => {
    const previousPages = listPreviousPages(total, current);
    const consecutivePages = listConsecutivePages(total, previousPages[0] ?? 1, current);

    const enabled = total > 1;
    const first = current > 2;
    const previous = current - 1;
    const next = current + 1;
    const last = current < total - 1;

    const renderImage = (image: PaginationImage): ReactElement => (
        <Icon
            path={image.double ? mdiChevronDoubleRight : mdiChevronRight}
            rotate={image.rotate ? 180 : 0}
            size={1}
            title={image.title}
            className="valign-middle"
        />
    );

    const renderPage = (page: number, image?: PaginationImage): ReactElement => (
        <Link href={`${path}${page}/${postfix ? `${postfix}/` : ''}`} className="button-icon phm" key={`pagination${page}`}>
            {image ? renderImage(image) : page}
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
                {previousPages.map((page: number) => renderPage(page))}
                <span className="valign-middle phm strong">{current}</span>
                {consecutivePages.map((page: number) => renderPage(page))}
            </span>
            {consecutivePages.length ? renderPage(next, { title: 'Next page' }) : null}
            {last ? renderPage(total, { title: 'Last page', double: true }) : null}
        </div>
    ) : null;
};
