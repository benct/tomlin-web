import makeAction from '../redux/makeAction';
import makeReducer, { Actions } from '../redux/makeReducer';

import { PaginationState } from '../interfaces';

import defaultState from '../redux/defaultState';

const actions: Actions = {};

const createListOfPreviousPages = (totalPages: number, currentPage: number): number[] => {
    const minPageNr = Math.min(currentPage - 3, totalPages - 5);
    const firstPage = Math.max(minPageNr, 1);
    const previousPages = [];
    for (let i = firstPage; i < currentPage; i++) {
        previousPages.push(i);
    }
    return previousPages;
};

const createListOfConsecutivePages = (totalPages: number, firstPage: number, currentPage: number): number[] => {
    const lastPage = Math.min(totalPages, firstPage + 6);
    const consecutivePages = [];
    for (let i = currentPage + 1; i <= lastPage; i++) {
        consecutivePages.push(i);
    }
    return consecutivePages;
};

actions.set = makeAction(
    'PAGINATION/SET',
    (state, { payload }): PaginationState => {
        const previousPages = createListOfPreviousPages(payload.total, payload.current);
        const consecutivePages = createListOfConsecutivePages(payload.total, previousPages[0] || 1, payload.current);

        return {
            ...state,
            enabled: payload.total > 1,
            first: payload.current > 2,
            previousPages,
            previous: payload.current - 1,
            current: payload.current,
            next: payload.current + 1,
            consecutivePages,
            last: payload.current < payload.total - 1,
            total: payload.total,
        };
    }
);

actions.reset = makeAction('PAGINATION/RESET', (state): PaginationState => ({ ...state, ...defaultState.pagination }));

export default actions;

export const reducer = makeReducer(actions);
