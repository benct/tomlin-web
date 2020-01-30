import { ActionsObject, makeAction, makeReducer } from '@finn-no/redux-actions';

import {
    MediaEpisodeEntry,
    MediaItemEntry,
    MediaResults,
    MediaSearchItemEntry,
    MediaSeasonEntry,
    MediaState,
    MediaType,
    ThunkResult,
} from '../interfaces';

import { api, del, get, post } from '../util/api';
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
        results: payload.results ?? [],
        page: {
            current: payload.page,
            total: payload.total_pages,
        },
    },
}));

actions.setStats = makeAction('MEDIA/SET_STATS', 'stats');

actions.setSort = makeAction('MEDIA/SET_SORT', 'sort');

actions.showModal = makeAction('MEDIA/SHOW_MODAL', (state, { payload }) => ({ ...state, showModal: true, item: payload ?? state.item }));

actions.hideModal = makeAction('MEDIA/HIDE_MODAL', state => ({ ...state, showModal: false }));

actions.setSearch = makeAction('MEDIA/SET_SEARCH', 'search');

actions.setExisting = makeAction('MEDIA/SET_EXISTING', 'existing');

actions.setFavourite = makeAction('MEDIA/SET_FAV', (state, { payload }) => {
    const action: MediaType = payload.action;
    const actionState: MediaResults<MediaItemEntry> | null = state[action];
    const results: MediaItemEntry[] = actionState ? actionState.results : [];

    return {
        ...state,
        item: state.item ? { ...state.item, favourite: payload.set } : null,
        [action]: {
            ...actionState,
            results: results.map(
                (item: MediaItemEntry): MediaItemEntry => {
                    if (item.id === payload.id) {
                        item.favourite = payload.set;
                    }
                    return item;
                }
            ),
        },
    };
});

actions.setSeen = makeAction('MEDIA/SET_SEEN', (state, { payload }) => {
    const action: MediaType = payload.action;
    const actionState: MediaResults<MediaItemEntry> | null = state[action];
    const results: MediaItemEntry[] = actionState ? actionState.results : [];

    return {
        ...state,
        item: state.item ? { ...state.item, seen: payload.set } : state.item,
        [action]: {
            ...actionState,
            results: results.map(
                (item: MediaItemEntry): MediaItemEntry => {
                    if (item.id === payload.id) {
                        item.seen = payload.set;
                    }
                    return item;
                }
            ),
        },
    };
});

actions.setEpisodeSeen = makeAction('MEDIA/SET_EPISODE_SEEN', (state, { payload: { seasonId, episodeId, set } }) => ({
    ...state,
    item: state.item
        ? {
              ...state.item,
              seasons:
                  state.item.seasons &&
                  state.item.seasons.map(
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
          }
        : null,
}));

export const getStats = (): ThunkResult<Promise<void>> => async (dispatch): Promise<void> => {
    dispatch(baseActions.setLoading(true));

    await api('GET', '/media', { loading: false })
        .then(response => dispatch(actions.setStats(response)))
        .catch(() => dispatch(showToast('Could not fetch stats...')))
        .finally(() => dispatch(baseActions.setLoading(false)));
};

export const getMedia = ({ type, sort, page, query }: MediaActionProps): ThunkResult<Promise<void>> => async (
    dispatch,
    getState
): Promise<void> =>
    await get<MediaResults<MediaItemEntry>>(`/media/${type}`, {
        query,
        page: page ?? getState().pagination.current,
        sort: sort ?? getState().media.sort,
    })
        .then(response => {
            dispatch(actions.setMedia({ ...response, key: type }));
            dispatch(paginationActions.set({ current: response.page, total: response.total_pages }));
        })
        .catch(() => {
            dispatch(paginationActions.reset());
            dispatch(showToast('Could not fetch media content...'));
        });

export const getTmdbMedia = ({ action, type, id, page }: MediaActionProps): ThunkResult<Promise<void>> => async (
    dispatch,
    getState
): Promise<void> =>
    await get<MediaResults<MediaSearchItemEntry>>(`/media/${type}/${action}/${id ?? ''}`, { page: page ?? getState().pagination.current })
        .then(response => {
            dispatch(actions.setSearch(response.results ?? []));
            dispatch(paginationActions.set({ current: response.page, total: Math.min(response.total_pages, 1000) }));
        })
        .catch(() => {
            dispatch(paginationActions.reset());
            dispatch(showToast('Could not fetch media content...'));
        });

export const searchTmdbMedia = (query: string): ThunkResult<Promise<void>> => async (dispatch): Promise<void> =>
    await get<MediaResults<MediaSearchItemEntry>>('/media/search', { query: encodeURI(query) })
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
            dispatch(paginationActions.reset());
        })
        .catch(() => dispatch(showToast('Failed to execute search...')));

export const setItem = ({ type, id, override }: MediaActionProps): ThunkResult<Promise<void>> => async (
    dispatch,
    getState
): Promise<void> => {
    const item = getState().media.item;

    if (override || !item || item.id !== id) {
        await get(`/media/${type}/${id}`)
            .then(response => {
                dispatch(actions.showModal(response));
            })
            .catch(() => {
                dispatch(actions.hideModal());
                dispatch(showToast('Could not fetch media content...'));
            });
    } else {
        dispatch(actions.showModal());
    }
};

export const existing = (): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await get('/media/existing')
            .then(response => dispatch(actions.setExisting(response)))
            .catch(() => dispatch(showToast('Could not fetch media content...')));
    }
};

export const add = ({ type, id }: MediaActionProps): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await post(`/media/${type}/${id}`)
            .then(() => {
                dispatch(existing());
                dispatch(showToast('Media successfully added!'));
            })
            .catch(() => dispatch(showToast('Failed to add media...')));
    }
};

export const remove = ({ action, type, id }: MediaActionProps): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn && confirm(`Are you sure you want to remove this?`)) {
        await del(`/media/${type}/${id}`)
            .then(() => {
                if (action) {
                    dispatch(getMedia({ type: action }));
                }
                dispatch(actions.hideModal());
                dispatch(existing());
                dispatch(showToast('Media successfully removed!'));
            })
            .catch(() => dispatch(showToast('Failed to remove media...')));
    }
};

export const update = ({ action, type, id }: MediaActionProps): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await post(`/media/${type}/${id}`)
            .then(() => {
                dispatch(getMedia({ type: action }));
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
        await post(`/media/${type}/favourite/${id}`, { set })
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
        await post(`/media/${type}/seen/${id}`, { set })
            .then(() => {
                dispatch(actions.setSeen({ action, id, set }));
                dispatch(showToast(`Set as ${set ? 'seen' : 'unseen'}!`));
            })
            .catch(() => dispatch(showToast('Could not set seen...')));
    }
};

export const seenEpisode = ({ id, set }: MediaActionProps): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await post(`/media/tv/seen/episode/${id}`, { set })
            .then(() => {
                dispatch(actions.setEpisodeSeen({ episodeId: id, set }));
                dispatch(showToast(`Set as ${set ? 'seen' : 'unseen'}!`));
            })
            .catch(() => dispatch(showToast('Could not set seen...')));
    }
};

export const seenEpisodes = (seasonId: number): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await post(`/media/tv/seen/season/${seasonId}`, { set: true })
            .then(() => {
                dispatch(actions.setEpisodeSeen({ seasonId, set: true }));
                dispatch(showToast('All episodes set as seen'));
            })
            .catch(() => dispatch(showToast('Could not set seen...')));
    }
};

export const goToIMDb = ({ type, id }: MediaActionProps): ThunkResult<Promise<void>> => async (dispatch): Promise<void> =>
    await post(`/media/${type}/external/${id}`)
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
