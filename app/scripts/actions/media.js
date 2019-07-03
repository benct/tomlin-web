import makeAction from '../redux/makeAction';
import makeReducer from '../redux/makeReducer';

import { get, post } from '../util/api';
import baseActions from './base.js';
import paginationActions from './pagination';

const actions = {};

actions.set = makeAction('MEDIA/SET', (state, { payload }) => ({
    ...state,
    [payload.key]: {
        results: payload.results || [],
        page: {
            current: payload.page,
            total: payload.total_pages,
        },
    },
}));

actions.get = ({ action, sort, page, query }) => (dispatch, getState) =>
    get({ service: 'media', action, query, page: page || getState().pagination.current, sort: sort || getState().media.sort })
        .then(response => {
            dispatch(actions.set({ ...response, key: action }));
            dispatch(paginationActions.set({ current: response.page, total: response.total_pages }));
        })
        .catch(() => {
            dispatch(paginationActions.reset());
            dispatch(baseActions.showToast('Could not fetch media content...'));
        });

actions.setSort = makeAction('MEDIA/SET_SORT', 'sort');

actions.showModal = makeAction('MEDIA/SHOW_MODAL', (state, { payload }) => ({ ...state, showModal: true, item: payload || state.item }));

actions.hideModal = makeAction('MEDIA/HIDE_MODAL', state => ({ ...state, showModal: false }));

actions.setItem = ({ type, id, override }) => (dispatch, getState) => {
    if (override || !getState().media.item || getState().media.item.id !== id) {
        get({ service: 'media', action: 'get', type, id })
            .then(response => {
                dispatch(actions.showModal(response));
            })
            .catch(() => {
                dispatch(actions.hideModal());
                dispatch(baseActions.showToast('Could not fetch media content...'));
            });
    } else {
        dispatch(actions.showModal());
    }
};

actions.setSearch = makeAction('MEDIA/SET_SEARCH', 'search');

actions.post = ({ action, type, id, page }) => (dispatch, getState) =>
    post({ service: 'media', action, type, id, page: page || getState().pagination.current })
        .then(response => {
            dispatch(actions.setSearch(response.results || []));
            dispatch(actions.setExisting(response.existing));
            dispatch(paginationActions.set({ current: response.page, total: Math.min(response.total_pages, 1000) }));
        })
        .catch(() => {
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

actions.setExisting = makeAction('MEDIA/SET_EXISTING', 'existing');

actions.addExisting = makeAction('MEDIA/ADD_EXISTING', (state, { payload }) => {
    const existing = state.existing.slice();
    existing.push(payload);

    return { ...state, existing };
});

actions.removeExisting = makeAction('MEDIA/REMOVE_EXISTING', (state, { payload }) => ({
    ...state,
    existing: state.existing.filter(i => i !== payload),
}));

actions.add = ({ type, id }) => (dispatch, getState) => {
    if (getState().auth.isLoggedIn) {
        post({ service: 'media', action: 'save', type, id })
            .then(() => {
                dispatch(actions.addExisting(id));
                dispatch(baseActions.showToast('Media successfully added!'));
            })
            .catch(() => dispatch(baseActions.showToast('Failed to add media...')));
    }
};

actions.remove = ({ action, type, id }) => (dispatch, getState) => {
    if (getState().auth.isLoggedIn && confirm(`Are you sure you want to remove this?`)) {
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

actions.update = ({ action, type, id }) => (dispatch, getState) => {
    if (getState().auth.isLoggedIn) {
        post({ service: 'media', action: 'update', type, id })
            .then(() => {
                dispatch(actions.get({ action }));
                dispatch(actions.setItem({ type, id, override: true }));
                dispatch(baseActions.showToast('Media successfully updated!'));
            })
            .catch(() => dispatch(baseActions.showToast('Failed to update media...')));
    }
};

actions.setFavourite = makeAction('MEDIA/SET_FAV', (state, { payload: { action, id, set } }) => ({
    ...state,
    item: state.item ? { ...state.item, favourite: set } : null,
    [action]: {
        ...state[action],
        results: state[action].results.map(item => {
            if (item.id === id) {
                item.favourite = set;
            }
            return item;
        }),
    },
}));

actions.favourite = ({ action, type, id, set }) => (dispatch, getState) => {
    if (getState().auth.isLoggedIn) {
        post({ service: 'media', action: 'favourite', type, id, set })
            .then(() => {
                dispatch(actions.setFavourite({ action, id, set }));
                dispatch(baseActions.showToast(`${set ? 'Added to' : 'Removed from'} favourites!`));
            })
            .catch(() => dispatch(baseActions.showToast('Could not set favourite...')));
    }
};

actions.setSeen = makeAction('MEDIA/SET_SEEN', (state, { payload: { action, id, set } }) => ({
    ...state,
    item: state.item ? { ...state.item, seen: set } : state.item,
    [action]: {
        ...state[action],
        results: state[action].results.map(item => {
            if (item.id === id) {
                item.seen = set;
            }
            return item;
        }),
    },
}));

actions.seen = ({ action, type, id, set }) => (dispatch, getState) => {
    if (getState().auth.isLoggedIn) {
        post({ service: 'media', action: 'seen', type, id, set })
            .then(() => {
                dispatch(actions.setSeen({ action, id, set }));
                dispatch(baseActions.showToast(`Set as ${set ? 'seen' : 'unseen'}!`));
            })
            .catch(() => dispatch(baseActions.showToast('Could not set seen...')));
    }
};

actions.setEpisodeSeen = makeAction('MEDIA/SET_EPISODE_SEEN', (state, { payload: { seasonId, episodeId, set } }) => {
    const item = {
        ...state.item,
        seasons: state.item.seasons.map(season => ({
            ...season,
            episodes: season.episodes.map(episode => ({
                ...episode,
                seen: season.id === seasonId || episode.id === episodeId ? set : episode.seen,
            })),
        })),
    };
    return { ...state, item };
});

actions.seenEpisode = ({ id, set }) => (dispatch, getState) => {
    if (getState().auth.isLoggedIn) {
        post({ service: 'media', action: 'seen', type: 'episode', id, set })
            .then(() => {
                dispatch(actions.setEpisodeSeen({ episodeId: id, set }));
                dispatch(baseActions.showToast(`Set as ${set ? 'seen' : 'unseen'}!`));
            })
            .catch(() => dispatch(baseActions.showToast('Could not set seen...')));
    }
};

actions.seenEpisodes = ({ seasonId }) => (dispatch, getState) => {
    if (getState().auth.isLoggedIn) {
        post({ service: 'media', action: 'seen', type: 'season', id: seasonId, set: true })
            .then(() => {
                dispatch(actions.setEpisodeSeen({ seasonId, set: true }));
                dispatch(baseActions.showToast('All episodes set as seen'));
            })
            .catch(() => dispatch(baseActions.showToast('Could not set seen...')));
    }
};

actions.setStats = makeAction('MEDIA/SET_STATS', 'stats');

actions.stats = () => dispatch =>
    get({ service: 'media', action: 'stats' })
        .then(response => dispatch(actions.setStats(response)))
        .catch(() => dispatch(baseActions.showToast('Could not fetch stats...')));

actions.goToIMDb = ({ type, id }) => dispatch =>
    post({ service: 'media', action: 'external', type, id })
        .then(response =>
            response
                ? window.open(`https://www.imdb.com/title/${response}`, '_blank').focus()
                : dispatch(baseActions.showToast('No external ID found...'))
        )
        .catch(() => dispatch(baseActions.showToast('Failed to get external ID...')));

export default actions;

export const reducer = makeReducer(actions);
