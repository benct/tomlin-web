import makeAction from './makeAction.js';
import makeReducer from './makeReducer.js';

import defaultState from './defaultState.js';
import auth from '../util/auth.js';
import quotes from '../util/quotes.js';
import pagination from '../util/pagination.js';
import { get, post, fetchFile } from '../util/api.js';

const merge = (state, payload) => Object.assign({}, state, payload);
const actions = {};

actions.setLoggedIn = makeAction('AUTH/SET_LOGGED_IN', 'isLoggedIn');

actions.toggleIcons = makeAction('BASE/TOGGLE_ICONS', state => merge(state, { circleIcons: !state.circleIcons }));

actions.toggleMenu = makeAction('BASE/TOGGLE_MENU', state => merge(state, { showMenu: !state.showMenu }));

actions.showToast = payload => dispatch => {
    dispatch(actions.setToast(payload));

    setTimeout(() => dispatch(actions.setToast(null)), 3000);
};

actions.setToast = makeAction('BASE/SET_TOAST', 'toast');

actions.refreshQuote = makeAction('BASE/REFRESH_QUOTE', state =>
    merge(state, {
        quote: {
            text: quotes[state.quote.current][0],
            author: quotes[state.quote.current].length > 1 ? quotes[state.quote.current][1] : null,
            current: state.quote.current === quotes.length - 1 ? 0 : state.quote.current + 1,
        },
    })
);

actions.setLinkData = makeAction('CONTENT/SET_LINKS', 'links');
actions.setNoteData = makeAction('CONTENT/SET_NOTES', 'notes');

actions.loadContent = ({ type, file }) => dispatch => {
    const action = type === 'links' ? actions.setLinkData : actions.setNoteData;

    dispatch(action({ content: null, loading: true }));

    fetchFile(`/assets/content/${file}`)
        .then(data => dispatch(action({ content: data, loading: false })))
        .catch(() => {
            dispatch(action({ content: null, loading: false }));
            dispatch(actions.showToast('Could not load file...'));
        });
};

actions.setMedia = makeAction('MEDIA/SET', 'media');

actions.setSearch = makeAction('MEDIA/SEARCH', 'search');

actions.clearMedia = makeAction('MEDIA/CLEAR', state =>
    merge(state, {
        media: defaultState.media,
        search: defaultState.search,
        pagination: defaultState.pagination,
    })
);

actions.setPagination = makeAction('PAGINATION/SET', (state, { payload }) =>
    merge(state, { pagination: pagination(payload.total, payload.current) })
);

actions.resetPagination = makeAction('PAGINATION/RESET', state => merge(state, { pagination: defaultState.pagination }));

actions.getMedia = ({ action, page }) => (dispatch, getState) => {
    get({ service: 'media', action, page: page || getState().pagination.current })
        .then(response => {
            dispatch(
                actions.setMedia({
                    data: response.results || [],
                    stats: response.stats,
                })
            );
            dispatch(actions.setPagination({ current: response.page, total: response.total_pages }));
        })
        .catch(() => {
            dispatch(actions.clearMedia());
            dispatch(actions.showToast('Could not fetch media content...'));
        });
};

actions.postMedia = ({ action, type, page }) => (dispatch, getState) => {
    post({ service: 'media', action, type, page: page || getState().pagination.current })
        .then(response => {
            dispatch(
                actions.setSearch({
                    data: response.results || [],
                    existing: response.existing,
                })
            );
            dispatch(actions.setPagination({ current: response.page, total: Math.min(response.total_pages, 1000) }));
        })
        .catch(() => {
            dispatch(actions.clearMedia());
            dispatch(actions.showToast('Could not fetch media content...'));
        });
};

actions.searchMedia = payload => dispatch => {
    post({ service: 'media', action: 'search', query: encodeURI(payload) })
        .then(response => {
            dispatch(
                actions.setSearch({
                    data: response.results ? response.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv') : [],
                    existing: response.existing,
                })
            );
            dispatch(actions.resetPagination());
        })
        .catch(() => dispatch(actions.showToast('Failed to execute search...')));
};

actions.addMedia = ({ type, id }) => dispatch => {
    post({ service: 'media', action: 'save', type, id })
        .then(() => dispatch(actions.showToast('Media successfully added!')))
        .catch(() => dispatch(actions.showToast('Failed to add media...')));
};

actions.removeMedia = ({ type, id }) => dispatch => {
    post({ service: 'media', action: 'delete', type, id })
        .then(() => dispatch(actions.showToast('Media successfully removed!')))
        .catch(() => dispatch(actions.showToast('Failed to remove media...')));
};

actions.setFavourite = ({ action, type, id, set }) => dispatch => {
    if (auth.loggedIn()) {
        post({ service: 'media', action: 'favourite', type, id, set })
            .then(() => {
                dispatch(actions.getMedia({ action }));
                dispatch(actions.showToast(`${set ? 'Added to' : 'Removed from'} favourites!`));
            })
            .catch(() => dispatch(actions.showToast('Could not set favourite...')));
    }
};

actions.setSeen = ({ action, type, id, set }) => dispatch => {
    if (auth.loggedIn()) {
        post({ service: 'media', action: 'seen', type, id, set })
            .then(() => {
                dispatch(actions.getMedia({ action }));
                dispatch(actions.showToast(`Set as ${set ? 'seen' : 'unseen'}!`));
            })
            .catch(() => dispatch(actions.showToast('Could not set seen...')));
    }
};

actions.goToIMDb = ({ type, id }) => dispatch => {
    post({ service: 'media', action: 'external', type, id })
        .then(
            response =>
                response
                    ? window.open(`https://www.imdb.com/title/${response}`, '_blank').focus()
                    : dispatch(actions.showToast('No external ID found...'))
        )
        .catch(() => dispatch(actions.showToast('Failed to get external ID...')));
};

actions.updatePosters = () => dispatch => {
    post({ service: 'media', action: 'images', overwrite: false })
        .then(response => dispatch(actions.showToast(`Successfully updated ${response} posters!`)))
        .catch(() => dispatch(actions.showToast('Failed to update posters...')));
};

export default actions;

export const reducer = makeReducer(actions);
