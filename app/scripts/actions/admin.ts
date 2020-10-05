import { ActionsObject, makeAction, makeReducer } from '@finn-no/redux-actions';

import { AdminState, Flight, Log, PaginationResponse, ThunkResult, Visit } from '../interfaces';

import { del, get, load, post } from '../util/api';
import { showToast } from './base';
import paginationActions from './pagination';

const actions: ActionsObject<AdminState> = {};

actions.setStats = makeAction('ADMIN/SET_STATS', 'stats');

actions.setVisits = makeAction('ADMIN/SET_VISITS', 'visits');

actions.setLogs = makeAction('ADMIN/SET_LOGS', 'logs');

actions.removeLog = makeAction('ADMIN/REMOVE_LOG', (state, { payload }) => ({
    ...state,
    logs: state.logs ? { ...state.logs, results: state.logs.results.filter((log) => log.id != payload) } : null,
}));

actions.setUsers = makeAction('ADMIN/SET_USERS', 'users');

actions.setNotes = makeAction('ADMIN/SET_NOTES', 'notes');

actions.setFlights = makeAction('ADMIN/SET_FLIGHTS', 'flights');

actions.setHass = makeAction('ADMIN/SET_HASS', 'hass');

export const getStats = (): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await get('/admin/stats')
            .then((response) => dispatch(actions.setStats(response || {})))
            .catch(() => dispatch(showToast('Could not fetch stats...')));
    }
};

export const getVisits = (page: number): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await get<PaginationResponse<Visit>>(`/admin/visits/${page}`)
            .then((response) => {
                dispatch(actions.setVisits(response));
                dispatch(paginationActions.set({ current: response.page, total: response.total_pages }));
            })
            .catch(() => {
                dispatch(paginationActions.reset());
                dispatch(showToast('Could not fetch visit data...'));
            });
    }
};

export const getLogs = (page: number): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await get<PaginationResponse<Log>>(`/admin/logs/${page}`)
            .then((response) => {
                dispatch(actions.setLogs(response));
                dispatch(paginationActions.set({ current: response.page, total: response.total_pages }));
            })
            .catch(() => {
                dispatch(paginationActions.reset());
                dispatch(showToast('Could not fetch log data...'));
            });
    }
};

export const clearLogs = (): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn && confirm('Are you sure you want to delete all logs?')) {
        await del('/admin/logs')
            .then((response) => {
                if (response) dispatch(actions.setLogs(null));
            })
            .catch(() => dispatch(showToast('Could not clear log data...')));
    }
};

export const deleteLog = (id: number): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn && confirm('Are you sure you want to delete this entry?')) {
        await del(`/admin/logs/${id}`)
            .then((response) => {
                if (response) dispatch(actions.removeLog(id));
            })
            .catch(() => dispatch(showToast('Could not clear log data...')));
    }
};

export const updateMedia = (type: string, count = 10): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await post(`/media/${type}/update/${count}`)
            .then((response) => dispatch(showToast(`Successfully updated ${response} items!`)))
            .catch(() => dispatch(showToast('Failed to update media content...')));
    }
};

export const updateIata = (type: string): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await post(`/iata/${type}`)
            .then((response) => dispatch(showToast(`Successfully updated ${response} entries!`)))
            .catch(() => dispatch(showToast('Failed to update IATA entries...')));
    }
};

export const getUsers = (): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await get('/user')
            .then((response) => dispatch(actions.setUsers(response || [])))
            .catch(() => dispatch(showToast('Could not fetch user data...')));
    }
};

export const saveUser = (email: string, name: string, password: string | null, enabled: boolean): ThunkResult<Promise<void>> => async (
    dispatch,
    getState
): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await post('/user', { email, name, password, enabled })
            .then(() => {
                dispatch(getUsers());
                dispatch(showToast('Successfully saved user!'));
            })
            .catch(() => dispatch(showToast('Could not store user...')));
    }
};

export const deleteUser = (email: string): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn && confirm('Are you sure you want to delete this user?')) {
        await del(`/user`, { email })
            .then(() => {
                dispatch(getUsers());
                dispatch(showToast('Successfully deleted user!'));
            })
            .catch(() => dispatch(showToast('Could not delete user...')));
    }
};

export const getNotes = (): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await get('/note')
            .then((response) => dispatch(actions.setNotes(response || [])))
            .catch(() => dispatch(showToast('Could not fetch notes...')));
    }
};

export const saveNote = (id: number | undefined, title: string, content: string): ThunkResult<Promise<void>> => async (
    dispatch,
    getState
): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await post('/note', { id, title, content })
            .then(() => {
                dispatch(getNotes());
                dispatch(showToast('Successfully saved note!'));
            })
            .catch(() => dispatch(showToast('Could not store note...')));
    }
};

export const deleteNote = (id: number): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn && confirm('Are you sure you want to delete this note?')) {
        await del(`/note/${id}`)
            .then(() => {
                dispatch(getNotes());
                dispatch(showToast('Successfully deleted note!'));
            })
            .catch(() => dispatch(showToast('Could not delete note...')));
    }
};

export const getFlights = (): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await get('/flight')
            .then((response) => dispatch(actions.setFlights(response || [])))
            .catch(() => dispatch(showToast('Could not fetch flights data...')));
    }
};

export const saveFlight = (data: Flight): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await post('/flight', data)
            .then(() => {
                dispatch(getFlights());
                dispatch(showToast('Successfully saved flight!'));
            })
            .catch(() => dispatch(showToast('Could not save flight...')));
    }
};

export const deleteFlight = (id: number): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn && confirm('Are you sure you want to delete this flight?')) {
        await del(`/flight/${id}`)
            .then(() => {
                dispatch(getFlights());
                dispatch(showToast('Successfully deleted flight!'));
            })
            .catch(() => dispatch(showToast('Could not delete flight...')));
    }
};

export const saveSetting = (key: string, value: string | null): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn && confirm('Are you sure you want to change this setting?')) {
        await post('/settings', { key, value })
            .then(() => dispatch(showToast('Successfully saved settings!')))
            .catch(() => dispatch(showToast('Could not save settings...')));
    }
};

export const getHass = (count = 25): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load('GET', `/hass/latest/${count}`)
            .then((response) => dispatch(actions.setHass(response || [])))
            .catch(() => dispatch(showToast('Could not fetch home-assistant data...')));
    }
};

export const backup = (): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await post('/admin/backup')
            .then((response) => (response ? dispatch(showToast('Successful backup!')) : Promise.reject()))
            .catch(() => dispatch(showToast('Backup process failed...')));
    }
};

export default actions;

export const reducer = makeReducer<AdminState>(actions);
