import { FC, ReactElement } from 'react';
import Link from 'next/link';
import { Icon } from '@mdi/react';
import { mdiChevronDoubleRight, mdiChevronRight } from '@mdi/js';
import { buttonIcon } from '@/styles';

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

    const computePath = (page: number) => `${path}${page}/${postfix ? `${postfix}/` : ''}`;

    const renderPage = (page: number): ReactElement => (
        <Link href={computePath(page)} key={`pagination${page}`}>
            <a className={`${buttonIcon} px-8`}>{page}</a>
        </Link>
    );

    const renderPageIcon = (page: number, { title, double, rotate }: PaginationImage) => (
        <Link href={computePath(page)} key={`pagination${page}`}>
            <a className={buttonIcon}>
                <Icon path={double ? mdiChevronDoubleRight : mdiChevronRight} rotate={rotate ? 180 : 0} size={1} title={title} />
            </a>
        </Link>
    );

    return enabled ? (
        <div className="flex justify-center items-center gap-8 pt-24">
            {first ? renderPageIcon(1, { title: 'First page', double: true, rotate: true }) : null}
            {previousPages.length ? renderPageIcon(previous, { title: 'Previous page', rotate: true }) : null}
            <span className="sm:hidden px-8">Page {current}</span>
            <div className="hidden sm:flex items-center gap-8 px-8">
                {previousPages.map((page: number) => renderPage(page))}
                <span className="text-secondary dark:text-secondary-dark font-bold px-8">{current}</span>
                {consecutivePages.map((page: number) => renderPage(page))}
            </div>
            {consecutivePages.length ? renderPageIcon(next, { title: 'Next page' }) : null}
            {last ? renderPageIcon(total, { title: 'Last page', double: true }) : null}
        </div>
    ) : null;
};
