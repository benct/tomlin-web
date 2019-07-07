import makeAction from '../redux/makeAction';
import makeReducer, { Actions } from '../redux/makeReducer';

import {
    AsyncAction,
    MediaEpisodeEntry,
    MediaItemEntry,
    MediaResults,
    MediaSearchItemEntry,
    MediaSearchResults,
    MediaSeasonEntry,
    MediaState,
} from '../interfaces';

import { get, post } from '../util/api';
import baseActions from './base';
import paginationActions from './pagination';

interface MediaActionProps {
    action?: string;
    type?: string;
    sort?: string;
    page?: number;
    id?: number;
    query?: string;
    override?: boolean;
    set?: boolean;
}

const actions: Actions = {};

actions.set = makeAction(
    'MEDIA/SET',
    (state, { payload }): MediaState => ({
        ...state,
        [payload.key]: {
            results: payload.results || [],
            page: {
                current: payload.page,
                total: payload.total_pages,
            },
        },
    })
);

actions.get = ({ action, sort, page, query }: MediaActionProps): AsyncAction => async (dispatch, getState): Promise<void> =>
    await get<MediaResults>({
        service: 'media',
        action,
        query,
        page: page || getState().pagination.current,
        sort: sort || getState().media.sort,
    })
        .then((response): void => {
            dispatch(actions.set({ ...response, key: action }));
            dispatch(paginationActions.set({ current: response.page, total: response.total_pages }));
        })
        .catch((): void => {
            dispatch(paginationActions.reset());
            dispatch(baseActions.showToast('Could not fetch media content...'));
        });

actions.setSort = makeAction('MEDIA/SET_SORT', 'sort');

actions.showModal = makeAction(
    'MEDIA/SHOW_MODAL',
    (state, { payload }): MediaState => ({ ...state, showModal: true, item: payload || state.item })
);

actions.hideModal = makeAction('MEDIA/HIDE_MODAL', (state): MediaState => ({ ...state, showModal: false }));

actions.setItem = ({ type, id, override }: MediaActionProps): AsyncAction => async (dispatch, getState): Promise<void> => {
    const item = getState().media.item;
    if (override || !item || item.id !== id) {
        await get({ service: 'media', action: 'get', type, id })
            .then((response): void => {
                dispatch(actions.showModal(response));
            })
            .catch((): void => {
                dispatch(actions.hideModal());
                dispatch(baseActions.showToast('Could not fetch media content...'));
            });
    } else {
        dispatch(actions.showModal());
    }
};

actions.setSearch = makeAction('MEDIA/SET_SEARCH', 'search');

actions.post = ({ action, type, id, page }: MediaActionProps): AsyncAction => async (dispatch, getState): Promise<void> =>
    await post<MediaSearchResults>({ service: 'media', action, type, id, page: page || getState().pagination.current })
        .then((response): void => {
            dispatch(actions.setSearch(response.results || []));
            dispatch(actions.setExisting(response.existing));
            dispatch(paginationActions.set({ current: response.page, total: Math.min(response.total_pages, 1000) }));
        })
        .catch((): void => {
            dispatch(paginationActions.reset());
            dispatch(baseActions.showToast('Could not fetch media content...'));
        });

actions.search = (query: string): AsyncAction => async (dispatch): Promise<void> =>
    await post<MediaSearchResults>({ service: 'media', action: 'search', query: encodeURI(query) })
        .then((response): void => {
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
        .catch((): void => dispatch(baseActions.showToast('Failed to execute search...')));

actions.setExisting = makeAction('MEDIA/SET_EXISTING', 'existing');

actions.addExisting = makeAction(
    'MEDIA/ADD_EXISTING',
    (state, { payload }): MediaState => {
        const existing = state.existing.slice();
        existing.push(payload);

        return { ...state, existing };
    }
);

actions.removeExisting = makeAction(
    'MEDIA/REMOVE_EXISTING',
    (state, { payload }): MediaState => ({
        ...state,
        existing: state.existing.filter((i: number): boolean => i !== payload),
    })
);

actions.add = ({ type, id }: MediaActionProps): AsyncAction => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await post({ service: 'media', action: 'save', type, id })
            .then((): void => {
                dispatch(actions.addExisting(id));
                dispatch(baseActions.showToast('Media successfully added!'));
            })
            .catch((): void => dispatch(baseActions.showToast('Failed to add media...')));
    }
};

actions.remove = ({ action, type, id }: MediaActionProps): AsyncAction => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn && confirm(`Are you sure you want to remove this?`)) {
        await post({ service: 'media', action: 'delete', type, id })
            .then((): void => {
                if (action) {
                    dispatch(actions.get({ action }));
                }
                dispatch(actions.hideModal());
                dispatch(actions.removeExisting(id));
                dispatch(baseActions.showToast('Media successfully removed!'));
            })
            .catch((): void => dispatch(baseActions.showToast('Failed to remove media...')));
    }
};

actions.update = ({ action, type, id }: MediaActionProps): AsyncAction => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await post({ service: 'media', action: 'update', type, id })
            .then((): void => {
                dispatch(actions.get({ action }));
                dispatch(actions.setItem({ type, id, override: true }));
                dispatch(baseActions.showToast('Media successfully updated!'));
            })
            .catch((): void => dispatch(baseActions.showToast('Failed to update media...')));
    }
};

actions.setFavourite = makeAction(
    'MEDIA/SET_FAV',
    (state, { payload: { action, id, set } }): MediaState => ({
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
    })
);

actions.favourite = ({ action, type, id, set }: MediaActionProps): AsyncAction => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await post({ service: 'media', action: 'favourite', type, id, set })
            .then((): void => {
                dispatch(actions.setFavourite({ action, id, set }));
                dispatch(baseActions.showToast(`${set ? 'Added to' : 'Removed from'} favourites!`));
            })
            .catch((): void => dispatch(baseActions.showToast('Could not set favourite...')));
    }
};

actions.setSeen = makeAction(
    'MEDIA/SET_SEEN',
    (state, { payload: { action, id, set } }): MediaState => ({
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
    })
);

actions.seen = ({ action, type, id, set }: MediaActionProps): AsyncAction => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await post({ service: 'media', action: 'seen', type, id, set })
            .then((): void => {
                dispatch(actions.setSeen({ action, id, set }));
                dispatch(baseActions.showToast(`Set as ${set ? 'seen' : 'unseen'}!`));
            })
            .catch((): void => dispatch(baseActions.showToast('Could not set seen...')));
    }
};

actions.setEpisodeSeen = makeAction(
    'MEDIA/SET_EPISODE_SEEN',
    (state, { payload: { seasonId, episodeId, set } }): MediaState => {
        const item = {
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
        };
        return { ...state, item };
    }
);

actions.seenEpisode = ({ id, set }: MediaActionProps): AsyncAction => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await post({ service: 'media', action: 'seen', type: 'episode', id, set })
            .then((): void => {
                dispatch(actions.setEpisodeSeen({ episodeId: id, set }));
                dispatch(baseActions.showToast(`Set as ${set ? 'seen' : 'unseen'}!`));
            })
            .catch((): void => dispatch(baseActions.showToast('Could not set seen...')));
    }
};

actions.seenEpisodes = (seasonId: number): AsyncAction => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await post({ service: 'media', action: 'seen', type: 'season', id: seasonId, set: true })
            .then((): void => {
                dispatch(actions.setEpisodeSeen({ seasonId, set: true }));
                dispatch(baseActions.showToast('All episodes set as seen'));
            })
            .catch((): void => dispatch(baseActions.showToast('Could not set seen...')));
    }
};

actions.setStats = makeAction('MEDIA/SET_STATS', 'stats');

actions.stats = (): AsyncAction => async (dispatch): Promise<void> =>
    await get({ service: 'media', action: 'stats' })
        .then((response): void => dispatch(actions.setStats(response)))
        .catch((): void => dispatch(baseActions.showToast('Could not fetch stats...')));

actions.goToIMDb = ({ type, id }: MediaActionProps): AsyncAction => async (dispatch): Promise<void> =>
    await post({ service: 'media', action: 'external', type, id })
        .then((response): void => {
            if (response) {
                const win = window.open(`https://www.imdb.com/title/${response}`, '_blank');
                win ? win.focus() : undefined;
            } else {
                dispatch(baseActions.showToast('No external ID found...'));
            }
        })
        .catch((): void => dispatch(baseActions.showToast('Failed to get external ID...')));

export default actions;

export const reducer = makeReducer(actions);
