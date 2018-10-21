import makeAction from '../redux/makeAction.js';
import makeReducer from '../redux/makeReducer.js';
import defaultState from '../redux/defaultState.js';

const actions = {};

function createListOfPreviousPages(totalPages, currentPage) {
    const minPageNr = Math.min(currentPage - 3, totalPages - 5);
    const firstPage = Math.max(minPageNr, 1);
    const previousPages = [];
    for (let i = firstPage; i < currentPage; i++) {
        previousPages.push(i);
    }
    return previousPages;
}

function createListOfConsecutivePages(totalPages, firstPage, currentPage) {
    const lastPage = Math.min(totalPages, firstPage + 6);
    const consecutivePages = [];
    for (let i = currentPage + 1; i <= lastPage; i++) {
        consecutivePages.push(i);
    }
    return consecutivePages;
}

actions.set = makeAction('PAGINATION/SET', (state, { payload }) => {
    const previousPages = createListOfPreviousPages(payload.total, payload.current);
    const consecutivePages = createListOfConsecutivePages(payload.total, previousPages[0] || 1, payload.current);

    return Object.assign({}, state, {
        enabled: payload.total > 1,
        first: payload.current > 2,
        previousPages,
        previous: payload.current - 1,
        current: payload.current,
        next: payload.current + 1,
        consecutivePages,
        last: payload.current < payload.total - 1,
        total: payload.total,
    });
});

actions.reset = makeAction('PAGINATION/RESET', state => Object.assign({}, state, defaultState.pagination));

export default actions;

export const reducer = makeReducer(actions);
