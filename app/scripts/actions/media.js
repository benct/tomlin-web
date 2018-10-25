import makeAction from '../redux/makeAction.js';
import makeReducer from '../redux/makeReducer.js';

import auth from '../util/auth.js';
import { get, post } from '../util/api.js';

import baseActions from './base.js';
import paginationActions from './pagination.js';

const actions = {};

actions.set = makeAction('MEDIA/SET', (state, { payload }) =>
    Object.assign({}, state, {
        [payload.key]: {
            results: payload.results || [],
            stats: payload.stats,
            page: {
                current: payload.page,
                total: payload.total_pages,
            },
        },
    })
);

actions.clear = makeAction('MEDIA/CLEAR', (state, { payload }) => Object.assign({}, state, { [payload.key]: null }));

actions.showModal = makeAction('MEDIA/SHOW_MODAL', 'item');

actions.hideModal = makeAction('MEDIA/HIDE_MODAL', state => Object.assign({}, state, { item: null }));

actions.setSearch = makeAction('MEDIA/SET_SEARCH', 'search');

actions.setExisting = makeAction('MEDIA/SET_EXISTING', 'existing');

actions.addExisting = makeAction('MEDIA/ADD_EXISTING', (state, { payload }) => {
    const existing = state.existing.slice();
    existing.push(payload);

    return Object.assign({}, state, { existing });
});

actions.removeExisting = makeAction('MEDIA/REMOVE_EXISTING', (state, { payload }) =>
    Object.assign({}, state, { existing: state.existing.filter(i => i !== payload) })
);

actions.updateItem = makeAction('MEDIA/UPDATE_ITEM', (state, { payload }) => {
    const items = state[payload.key].slice().map(item => {
        if (item.id === payload.id) {
            return Object.assign(item, payload.data);
        }
        return item;
    });
    Object.assign({}, state, { [payload.key]: Object.assign({}, state[payload.key], { data: items }) });
});

actions.get = ({ action, page }) => (dispatch, getState) =>
    get({ service: 'media', action, page: page || getState().pagination.current })
        .then(response => {
            dispatch(actions.set(Object.assign(response, { key: action })));
            dispatch(paginationActions.set({ current: response.page, total: response.total_pages }));
        })
        .catch(() => {
            dispatch(actions.clear({ key: action }));
            dispatch(paginationActions.reset());
            dispatch(baseActions.showToast('Could not fetch media content...'));
        });

actions.post = ({ action, type, page }) => (dispatch, getState) =>
    post({ service: 'media', action, type, page: page || getState().pagination.current })
        .then(response => {
            dispatch(actions.setSearch(response.results || []));
            dispatch(actions.setExisting(response.existing));
            dispatch(paginationActions.set({ current: response.page, total: Math.min(response.total_pages, 1000) }));
        })
        .catch(() => {
            dispatch(actions.setSearch([]));
            dispatch(paginationActions.reset());
            dispatch(baseActions.showToast('Could not fetch media content...'));
        });

actions.search = payload => dispatch =>
    post({ service: 'media', action: 'search', query: encodeURI(payload) })
        .then(response => {
            dispatch(
                actions.setSearch(
                    response.results ? response.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv') : []
                )
            );
            dispatch(actions.setExisting(response.existing));
            dispatch(paginationActions.reset());
        })
        .catch(() => dispatch(baseActions.showToast('Failed to execute search...')));

actions.add = ({ type, id }) => dispatch =>
    post({ service: 'media', action: 'save', type, id })
        .then(() => {
            dispatch(actions.addExisting(id));
            dispatch(baseActions.showToast('Media successfully added!'));
        })
        .catch(() => dispatch(baseActions.showToast('Failed to add media...')));

actions.remove = ({ action, type, id }) => dispatch => {
    if (auth.loggedIn() && confirm(`Are you sure you want to remove this?`)) {
        post({ service: 'media', action: 'delete', type, id })
            .then(() => {
                if (action) {
                    dispatch(actions.get({ action }));
                }
                dispatch(actions.hideModal());
                dispatch(actions.removeExisting(id));
                dispatch(baseActions.showToast('Media successfully removed!'));
            })
            .catch(() => dispatch(baseActions.showToast('Failed to remove media...')));
    }
};

actions.update = ({ action, type, id }) => dispatch => {
    if (auth.loggedIn()) {
        post({ service: 'media', action: 'update', type, id })
            .then(() => {
                dispatch(actions.get({ action }));
                dispatch(baseActions.showToast('Media successfully updated!'));
            })
            .catch(() => dispatch(baseActions.showToast('Failed to update media...')));
    }
};

actions.favourite = ({ action, type, id, set }) => dispatch => {
    if (auth.loggedIn()) {
        post({ service: 'media', action: 'favourite', type, id, set })
            .then(() => {
                dispatch(actions.get({ action }));
                dispatch(baseActions.showToast(`${set ? 'Added to' : 'Removed from'} favourites!`));
            })
            .catch(() => dispatch(baseActions.showToast('Could not set favourite...')));
    }
};

actions.seen = ({ action, type, id, set }) => dispatch => {
    if (auth.loggedIn()) {
        post({ service: 'media', action: 'seen', type, id, set })
            .then(() => {
                dispatch(actions.get({ action }));
                dispatch(baseActions.showToast(`Set as ${set ? 'seen' : 'unseen'}!`));
            })
            .catch(() => dispatch(baseActions.showToast('Could not set seen...')));
    }
};

actions.goToIMDb = ({ type, id }) => dispatch =>
    post({ service: 'media', action: 'external', type, id })
        .then(
            response =>
                response
                    ? window.open(`https://www.imdb.com/title/${response}`, '_blank').focus()
                    : dispatch(baseActions.showToast('No external ID found...'))
        )
        .catch(() => dispatch(baseActions.showToast('Failed to get external ID...')));

actions.updatePosters = () => dispatch =>
    post({ service: 'media', action: 'images', overwrite: false })
        .then(response => dispatch(baseActions.showToast(`Successfully updated ${response} posters!`)))
        .catch(() => dispatch(baseActions.showToast('Failed to update posters...')));

export default actions;

export const reducer = makeReducer(actions);