import { ActionsObject, makeAction, makeReducer } from '@finn-no/redux-actions';

import { AdminState, ThunkResult } from '../interfaces';

import { load, post } from '../util/api';
import { showToast } from './base';

const actions: ActionsObject<AdminState> = {};

actions.setStats = makeAction('ADMIN/SET_STATS', 'stats');

actions.setVisits = makeAction('ADMIN/SET_VISITS', 'visits');

actions.setFlights = makeAction('ADMIN/SET_FLIGHTS', 'flights');

actions.setLogs = makeAction('ADMIN/SET_LOGS', 'logs');

actions.setNotes = makeAction('ADMIN/SET_NOTES', 'notes');

export const getStats = (): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await post({ service: 'db', action: 'stats' })
            .then(response => dispatch(actions.setStats(response || {})))
            .catch(() => dispatch(showToast('Could not fetch stats...')));
    }
};

export const getVisits = (): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'db', action: 'visits' })
            .then(response => dispatch(actions.setVisits(response || [])))
            .catch(() => dispatch(showToast('Could not fetch visiting data...')));
    }
};

export const getLogs = (count = 25): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'db', action: 'logs', count })
            .then(response => dispatch(actions.setLogs(response || [])))
            .catch(() => dispatch(showToast('Could not fetch log data...')));
    }
};

export const clearLogs = (): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'db', action: 'clear' })
            .then(response => (response ? dispatch(actions.setLogs([])) : null))
            .catch(() => dispatch(showToast('Could not clear log data...')));
    }
};

export const updatePosters = (): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'media', action: 'images', overwrite: false })
            .then(response => dispatch(showToast(`Successfully updated ${response} posters!`)))
            .catch(() => dispatch(showToast('Failed to update posters...')));
    }
};

export const updateMedia = (type: string, count = 10): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'media', action: 'update', type, count })
            .then(response => dispatch(showToast(`Successfully updated ${response} items!`)))
            .catch(() => dispatch(showToast('Failed to update media content...')));
    }
};

export const updateIata = (type: string): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'iata', action: type })
            .then(response => dispatch(showToast(`Successfully updated ${response} entries!`)))
            .catch(() => dispatch(showToast('Failed to update IATA entries...')));
    }
};

export const getNotes = (): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'notes', action: 'get' })
            .then(response => dispatch(actions.setNotes(response || [])))
            .catch(() => dispatch(showToast('Could not fetch notes...')));
    }
};

export const saveNote = (id: number, title: string, content: string): ThunkResult<Promise<void>> => async (
    dispatch,
    getState
): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'notes', action: 'store', id, title, content })
            .then(() => {
                dispatch(getNotes());
                dispatch(showToast('Successfully saved note!'));
            })
            .catch(() => dispatch(showToast('Could not store note...')));
    }
};

export const deleteNote = (id: number): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn && confirm(`Are you sure you want to delete this note?`)) {
        await load({ service: 'notes', action: 'delete', id })
            .then(() => {
                dispatch(getNotes());
                dispatch(showToast('Successfully deleted note!'));
            })
            .catch(() => dispatch(showToast('Could not delete note...')));
    }
};

export const getFlights = (): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'iata', action: 'flights' })
            .then(response => dispatch(actions.setFlights(response || [])))
            .catch(() => dispatch(showToast('Could not fetch flights data...')));
    }
};

export const saveFlight = (data: object): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'iata', action: 'flight', ...data })
            .then(() => {
                dispatch(getFlights());
                dispatch(showToast('Successfully saved flight!'));
            })
            .catch(() => dispatch(showToast('Could not save flight...')));
    }
};

export const deleteFlight = (id: number): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn && confirm(`Are you sure you want to delete this flight?`)) {
        await load({ service: 'iata', action: 'delete', id })
            .then(() => {
                dispatch(getFlights());
                dispatch(showToast('Successfully deleted flight!'));
            })
            .catch(() => dispatch(showToast('Could not delete flight...')));
    }
};

export default actions;

export const reducer = makeReducer<AdminState>(actions);
