import makeAction from '../redux/makeAction';
import makeReducer, { Actions } from '../redux/makeReducer';

import { AsyncAction } from '../interfaces';

import { load, post } from '../util/api';
import baseActions from './base';

const actions: Actions = {};

actions.setStats = makeAction('ADMIN/SET_STATS', 'stats');

actions.setVisits = makeAction('ADMIN/SET_VISITS', 'visits');

actions.setFlights = makeAction('ADMIN/SET_FLIGHTS', 'flights');

actions.setLogs = makeAction('ADMIN/SET_LOGS', 'logs');

actions.setNotes = makeAction('ADMIN/SET_NOTES', 'notes');

actions.getStats = (): AsyncAction => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await post({ service: 'db', action: 'stats' })
            .then((response): void => dispatch(actions.setStats(response || {})))
            .catch((): void => dispatch(baseActions.showToast('Could not fetch stats...')));
    }
};

actions.getVisits = (): AsyncAction => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'db', action: 'visits' })
            .then((response): void => dispatch(actions.setVisits(response || [])))
            .catch((): void => dispatch(baseActions.showToast('Could not fetch visiting data...')));
    }
};

actions.getLogs = (count: number): AsyncAction => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'db', action: 'logs', count })
            .then((response): void => dispatch(actions.setLogs(response || [])))
            .catch((): void => dispatch(baseActions.showToast('Could not fetch log data...')));
    }
};

actions.clearLogs = (): AsyncAction => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'db', action: 'clear' })
            .then((response): void => (response ? dispatch(actions.setLogs([])) : null))
            .catch((): void => dispatch(baseActions.showToast('Could not clear log data...')));
    }
};

actions.updatePosters = (): AsyncAction => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'media', action: 'images', overwrite: false })
            .then((response): void => dispatch(baseActions.showToast(`Successfully updated ${response} posters!`)))
            .catch((): void => dispatch(baseActions.showToast('Failed to update posters...')));
    }
};

actions.updateMedia = (type: string, count: number): AsyncAction => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'media', action: 'update', type, count })
            .then((response): void => dispatch(baseActions.showToast(`Successfully updated ${response} items!`)))
            .catch((): void => dispatch(baseActions.showToast('Failed to update media content...')));
    }
};

actions.updateIata = (type: string): AsyncAction => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'iata', action: type })
            .then((response): void => dispatch(baseActions.showToast(`Successfully updated ${response} entries!`)))
            .catch((): void => dispatch(baseActions.showToast('Failed to update IATA entries...')));
    }
};

actions.getNotes = (): AsyncAction => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'notes', action: 'get' })
            .then((response): void => dispatch(actions.setNotes(response || [])))
            .catch((): void => dispatch(baseActions.showToast('Could not fetch notes...')));
    }
};

actions.saveNote = (id: number, title: string, content: string): AsyncAction => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'notes', action: 'store', id, title, content })
            .then((): void => {
                dispatch(baseActions.showToast('Successfully saved note!'));
                dispatch(actions.getNotes());
            })
            .catch((): void => dispatch(baseActions.showToast('Could not store note...')));
    }
};

actions.deleteNote = (id: number): AsyncAction => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn && confirm(`Are you sure you want to delete this note?`)) {
        await load({ service: 'notes', action: 'delete', id })
            .then((): void => {
                dispatch(baseActions.showToast('Successfully deleted note!'));
                dispatch(actions.getNotes());
            })
            .catch((): void => dispatch(baseActions.showToast('Could not delete note...')));
    }
};

actions.getFlights = (): AsyncAction => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'iata', action: 'flights' })
            .then((response): void => dispatch(actions.setFlights(response || [])))
            .catch((): void => dispatch(baseActions.showToast('Could not fetch flights data...')));
    }
};

actions.saveFlight = (data: object): AsyncAction => async (dispatch, getState): Promise<void> => {
    if (getState().auth.isLoggedIn) {
        await load({ service: 'iata', action: 'flight', ...data })
            .then((): void => dispatch(actions.getFlights()))
            .catch((): void => dispatch(baseActions.showToast('Could not save flight...')));
    }
};

export default actions;

export const reducer = makeReducer(actions);
