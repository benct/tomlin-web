import { ActionsObject, makeAction, makeReducer } from '@finn-no/redux-actions';

import {
    MediaEpisodeEntry,
    MediaItemEntry,
    MediaResults,
    MediaSearchItemEntry,
    MediaSearchResults,
    MediaSeasonEntry,
    MediaState,
    ThunkResult,
} from '../interfaces';

import { get, load } from '../util/api';
import baseActions, { showToast } from './base';
import paginationActions from './pagination';

interface MediaActionProps {
    action?: string;
    type?: string;
    sort?: string;
    page?: number;
    id?: number | string;
    query?: string;
    override?: boolean;
    set?: boolean;
}

const actions: ActionsObject<MediaState> = {};

actions.setMedia = makeAction('MEDIA/SET', (state, { payload }) => ({
    ...state,
    [payload.key]: {
        results: payload.results || [],
        page: {
            current: payload.page,
            total: payload.total_pages,
        },
    },
}));

actions.setStats = makeAction('MEDIA/SET_STATS', 'stats');

actions.setSort = makeAction('MEDIA/SET_SORT', 'sort');

actions.showModal = makeAction('MEDIA/SHOW_MODAL', (state, { payload }) => ({ ...state, showModal: true, item: payload || state.item }));

actions.hideModal = makeAction('MEDIA/HIDE_MODAL', state => ({ ...state, showModal: false }));

actions.setSearch = makeAction('MEDIA/SET_SEARCH', 'search');

actions.setExisting = makeAction('MEDIA/SET_EXISTING', 'existing');

actions.addExisting = makeAction('MEDIA/ADD_EXISTING', (state, { payload }) => {
    const existing = state.existing.slice();
    existing.push(payload);

    return { ...state, existing };
});

actions.removeExisting = makeAction('MEDIA/REMOVE_EXISTING', (state, { payload }) => ({
    ...state,
    existing: state.existing.filter((i: number): boolean => i !== payload),
}));

actions.setFavourite = makeAction('MEDIA/SET_FAV', (state, { payload: { action, id, set } }) => ({
    ...state,
    item: state.item ? { ...state.item, favourite: set } : null,
    [action]: {
        ...state[action],
        results: state[action].results.map(
            (item: MediaItemEntry): MediaItemEntry => {
                if (item.id === id) {
                    item.favourite = set;
                }
                return item;
            }
        ),
    },
}));

actions.setSeen = makeAction('MEDIA/SET_SEEN', (state, { payload: { action, id, set } }) => ({
    ...state,
    item: state.item ? { ...state.item, seen: set } : state.item,
    [action]: {
        ...state[action],
        results: state[action].results.map(
            (item: MediaItemEntry): MediaItemEntry => {
                if (item.id === id) {
                    item.seen = set;
                }
                return item;
            }
        ),
    },
}));

actions.setEpisodeSeen = makeAction('MEDIA/SET_EPISODE_SEEN', (state, { payload: { seasonId, episodeId, set } }) => ({
    ...state,
    item: {
        ...state.item,
        seasons: state.item.seasons.map(
            (season: MediaSeasonEntry): MediaSeasonEntry => ({
                ...season,
                episodes: season.episodes.map(
                    (episode: MediaEpisodeEntry): MediaEpisodeEntry => ({
                        ...episode,
                        seen: season.id === seasonId || episode.id === episodeId ? set : episode.seen,
                    })
                ),
            })
        ),
    },
}));

export const getMedia = ({ action, sort, page, query }: MediaActionProps): ThunkResult<Promise<void>> => async (
    dispatch,
    getState
): Promise<void> => {
    dispatch(baseActions.setLoading(true));

    await get<MediaResults>({
        service: 'media',
        action,
        query,
        page: page || getState().pagination.current,
        sort: sort || getState().media.sort,
    })
        .then(response => {
            dispatch(actions.setMedia({ ...response, key: action }));
            dispatch(paginationActions.set({ current: response.page, total: response.total_pages }));
        })
        .catch(() => {
            dispatch(paginationActions.reset());
            dispatch(showToast('Could not fetch media content...'));
        })
        .finally(() => dispatch(baseActions.setLoading(false)));
};

export const getStats = (): ThunkResult<Promise<void>> => async (dispatch): Promise<void> => {
    dispatch(baseActions.setLoading(true));

    await get({ service: 'media', action: 'stats' })
        .then(response => dispatch(actions.setStats(response)))
        .catch(() => dispatch(showToast('Could not fetch stats...')))
        .finally(() => dispatch(baseActions.setLoading(false)));
};

export const setItem = ({ type, id, override }: MediaActionProps): ThunkResult<Promise<void>> => async (
    dispatch,
    getState
): Promise<void> => {
    const item = getState().media.item;
    if (override || !item || item.id !== id) {
        dispatch(baseActions.setLoading(true));

        await get({ service: 'media', action: 'get', type, id })
            .then(response => {
                dispatch(actions.showModal(response));
            })
            .catch(() => {
                dispatch(actions.hideModal());
                dispatch(showToast('Could not fetch media content...'));
            })
            .finally(() => dispatch(baseActions.setLoading(false)));
    } else {
        dispatch(actions.showModal());
    }
};

export const postMedia = ({ action, type, id, page }: MediaActionProps): ThunkResult<Promise<void>> => async (
    dispatch,
    getState
): Promise<void> =>
    await load<MediaSearchResults>({ service: 'media', action, type, id, page: page || getState().pagination.current })
        .then(response => {
            dispatch(actions.setSearch(response.results || []));
            dispatch(actions.setExisting(response.existing));
            dispatch(paginationActions.set({ current: response.page, total: Math.min(response.total_pages, 1000) }));
        })
        .catch(() => {
            dispatch(paginationActions.reset());
            dispatch(showToast('Could not fetch media content...'));
        });

export const searchMedia = (query: string): ThunkResult<Promise<void>> => async (dispatch): Promise<void> =>
    await load<MediaSearchResults>({ service: 'media', action: 'search', query: encodeURI(query) })
        .then(response => {
            dispatch(
                actions.setSearch(
                    response.results
                        ? response.results.filter(
                              (item: MediaSearchItemEntry): boolean => item.media_type === 'movie' || item.media_type === 'tv'
                          )
                        : []
                )
            );
            dispatch(actions.setExisting(response.existing));
            dispatch(paginationActions.reset());
        })
        .catch(() => dispatch(showToast('Failed to execute search...')));

export const add = ({ type, id }: MediaActionProps): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'media', action: 'save', type, id })
            .then(() => {
                dispatch(actions.addExisting(id));
                dispatch(showToast('Media successfully added!'));
            })
            .catch(() => dispatch(showToast('Failed to add media...')));
    }
};

export const remove = ({ action, type, id }: MediaActionProps): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn && confirm(`Are you sure you want to remove this?`)) {
        await load({ service: 'media', action: 'delete', type, id })
            .then(() => {
                if (action) {
                    dispatch(getMedia({ action }));
                }
                dispatch(actions.hideModal());
                dispatch(actions.removeExisting(id));
                dispatch(showToast('Media successfully removed!'));
            })
            .catch(() => dispatch(showToast('Failed to remove media...')));
    }
};

export const update = ({ action, type, id }: MediaActionProps): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'media', action: 'update', type, id })
            .then(() => {
                dispatch(getMedia({ action }));
                dispatch(setItem({ type, id, override: true }));
                dispatch(showToast('Media successfully updated!'));
            })
            .catch(() => dispatch(showToast('Failed to update media...')));
    }
};

export const favourite = ({ action, type, id, set }: MediaActionProps): ThunkResult<Promise<void>> => async (
    dispatch,
    getState
): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'media', action: 'favourite', type, id, set })
            .then(() => {
                dispatch(actions.setFavourite({ action, id, set }));
                dispatch(showToast(`${set ? 'Added to' : 'Removed from'} favourites!`));
            })
            .catch(() => dispatch(showToast('Could not set favourite...')));
    }
};

export const seen = ({ action, type, id, set }: MediaActionProps): ThunkResult<Promise<void>> => async (
    dispatch,
    getState
): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'media', action: 'seen', type, id, set })
            .then(() => {
                dispatch(actions.setSeen({ action, id, set }));
                dispatch(showToast(`Set as ${set ? 'seen' : 'unseen'}!`));
            })
            .catch(() => dispatch(showToast('Could not set seen...')));
    }
};

export const seenEpisode = ({ id, set }: MediaActionProps): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'media', action: 'seen', type: 'episode', id, set })
            .then(() => {
                dispatch(actions.setEpisodeSeen({ episodeId: id, set }));
                dispatch(showToast(`Set as ${set ? 'seen' : 'unseen'}!`));
            })
            .catch(() => dispatch(showToast('Could not set seen...')));
    }
};

export const seenEpisodes = (seasonId: number): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'media', action: 'seen', type: 'season', id: seasonId, set: true })
            .then(() => {
                dispatch(actions.setEpisodeSeen({ seasonId, set: true }));
                dispatch(showToast('All episodes set as seen'));
            })
            .catch(() => dispatch(showToast('Could not set seen...')));
    }
};

export const goToIMDb = ({ type, id }: MediaActionProps): ThunkResult<Promise<void>> => async (dispatch): Promise<void> =>
    await load({ service: 'media', action: 'external', type, id })
        .then(response => {
            if (response) {
                const win = window.open(`https://www.imdb.com/title/${response}`, '_blank');
                win ? win.focus() : undefined;
            } else {
                dispatch(showToast('No external ID found...'));
            }
        })
        .catch(() => dispatch(showToast('Failed to get external ID...')));

export default actions;

export const reducer = makeReducer<MediaState>(actions);
