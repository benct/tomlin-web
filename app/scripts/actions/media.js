import makeAction from '../redux/makeAction.js';
import makeReducer from '../redux/makeReducer.js';
import defaultState from '../redux/defaultState.js';

import auth from '../util/auth.js';
import { get, post } from '../util/api.js';

import baseActions from './base.js';
import paginationActions from './pagination.js';

const actions = {};

actions.set = makeAction('MEDIA/SET', (state, { payload }) => Object.assign({}, state, payload));

actions.clear = makeAction('MEDIA/CLEAR', state => Object.assign({}, state, defaultState.media));

actions.get = ({ action, page }) => (dispatch, getState) =>
    get({ service: 'media', action, page: page || getState().pagination.current })
        .then(response => {
            dispatch(
                actions.set({
                    list: response.results || [],
                    stats: response.stats,
                })
            );
            dispatch(paginationActions.set({ current: response.page, total: response.total_pages }));
        })
        .catch(() => {
            dispatch(actions.clear());
            dispatch(paginationActions.reset());
            dispatch(baseActions.showToast('Could not fetch media content...'));
        });

actions.post = ({ action, type, page }) => (dispatch, getState) =>
    post({ service: 'media', action, type, page: page || getState().pagination.current })
        .then(response => {
            dispatch(
                actions.set({
                    search: response.results || [],
                    existing: response.existing,
                })
            );
            dispatch(paginationActions.set({ current: response.page, total: Math.min(response.total_pages, 1000) }));
        })
        .catch(() => {
            dispatch(actions.clear());
            dispatch(paginationActions.reset());
            dispatch(baseActions.showToast('Could not fetch media content...'));
        });

actions.search = payload => dispatch =>
    post({ service: 'media', action: 'search', query: encodeURI(payload) })
        .then(response => {
            dispatch(
                actions.set({
                    search: response.results
                        ? response.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv')
                        : [],
                    existing: response.existing,
                })
            );
            dispatch(paginationActions.reset());
        })
        .catch(() => dispatch(baseActions.showToast('Failed to execute search...')));

actions.add = ({ type, id }) => dispatch =>
    post({ service: 'media', action: 'save', type, id })
        .then(() => dispatch(baseActions.showToast('Media successfully added!')))
        .catch(() => dispatch(baseActions.showToast('Failed to add media...')));

actions.remove = ({ type, id }) => dispatch =>
    post({ service: 'media', action: 'delete', type, id })
        .then(() => dispatch(baseActions.showToast('Media successfully removed!')))
        .catch(() => dispatch(baseActions.showToast('Failed to remove media...')));

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
