import makeAction from './makeAction.js';
import makeReducer from './makeReducer.js';

import { get, post } from '../util/api.js';
import auth from '../util/auth.js';
import defaultState from './defaultState.js';

const merge = (state, payload) => Object.assign({}, state, payload);
const actions = {};

actions.setLoggedIn = makeAction('SET_LOGGED_IN', 'isLoggedIn');

actions.toggleIcons = makeAction('TOGGLE_ICONS', state => merge(state, { circleIcons: !state.circleIcons }));

actions.toggleMenu = makeAction('TOGGLE_MENU', state => merge(state, { showMenu: !state.showMenu }));

actions.showToast = payload => dispatch => {
    dispatch(actions.setToast(payload));

    setTimeout(() => dispatch(actions.setToast(null)), 3000);
};

actions.setToast = makeAction('SET_TOAST', 'toast');

actions.setMedia = makeAction('SET_MEDIA', (state, { payload }) =>
    merge(state, {
        media: {
            data: payload.results,
            stats: payload.stats,
        },
    })
);

actions.setSearchMedia = makeAction('SET_SEARCH_MEDIA', (state, { payload }) =>
    merge(state, {
        search: {
            data: payload.filter
                ? payload.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv')
                : payload.results,
            existing: payload.existing,
        },
    })
);

actions.clearMedia = makeAction('CLEAR_MEDIA', state =>
    merge(state, {
        media: defaultState.media,
        search: defaultState.search,
        pagination: defaultState.pagination,
    })
);

actions.setPagination = makeAction('SET_PAGINATION', (state, { payload }) =>
    merge(state, {
        pagination: {
            enabled: !!payload.page,
            current: payload.page || 1,
            total: payload.total_pages || 1,
        },
    })
);

actions.resetPagination = makeAction('RESET_PAGINATION', state => merge(state, { pagination: defaultState.pagination }));

actions.getMedia = ({ action, page }) => (dispatch, getState) => {
    get({ service: 'media', action, page: page || getState().pagination.current })
        .then(response => {
            dispatch(actions.setMedia(response));
            dispatch(actions.setPagination(response));
        })
        .catch(() => {
            dispatch(actions.clearMedia());
            dispatch(actions.showToast('Could not fetch media content...'));
        });
};

actions.postMedia = ({ action, type, page }) => (dispatch, getState) => {
    post({ service: 'media', action, type, page: page || getState().pagination.current })
        .then(response => {
            dispatch(actions.setSearchMedia(response));
            dispatch(actions.setPagination(response));
        })
        .catch(() => {
            dispatch(actions.clearMedia());
            dispatch(actions.showToast('Could not fetch media content...'));
        });
};

actions.searchMedia = payload => dispatch => {
    post({ service: 'media', action: 'search', query: encodeURI(payload) })
        .then(response => {
            response.filter = true;
            dispatch(actions.setSearchMedia(response));
            dispatch(actions.setPagination(response));
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
        .then(response => window.open(`https://www.imdb.com/title/${response}`, '_blank').focus())
        .catch(() => dispatch(actions.showToast('Failed to get external ID...')));
};

actions.updatePosters = () => dispatch => {
    post({ service: 'media', action: 'images', overwrite: false })
        .then(response => dispatch(actions.showToast(`Successfully updated ${response} posters!`)))
        .catch(() => dispatch(actions.showToast('Failed to update posters...')));
};

export default actions;

export const reducer = makeReducer(actions);
