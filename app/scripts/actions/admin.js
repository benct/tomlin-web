import makeAction from '../redux/makeAction.js';
import makeReducer from '../redux/makeReducer.js';

import { post } from '../util/api';
import auth from '../util/auth';
import baseActions from './base.js';

const actions = {};

actions.setStats = makeAction('ADMIN/SET_STATS', 'stats');

actions.setVisits = makeAction('ADMIN/SET_VISITS', 'visits');

actions.setLogs = makeAction('ADMIN/SET_LOGS', 'logs');

actions.setNotes = makeAction('ADMIN/SET_NOTES', 'notes');

actions.getStats = () => dispatch => {
    if (auth.loggedIn()) {
        post({ service: 'db', action: 'stats' })
            .then(response => dispatch(actions.setStats(response || {})))
            .catch(() => dispatch(baseActions.showToast('Could not fetch stats...')));
    }
};

actions.getVisits = () => dispatch => {
    if (auth.loggedIn()) {
        post({ service: 'db', action: 'visits' })
            .then(response => dispatch(actions.setVisits(response || [])))
            .catch(() => dispatch(baseActions.showToast('Could not fetch visiting data...')));
    }
};

actions.getLogs = count => dispatch => {
    if (auth.loggedIn()) {
        post({ service: 'db', action: 'logs', count })
            .then(response => dispatch(actions.setLogs(response || [])))
            .catch(() => dispatch(baseActions.showToast('Could not fetch log data...')));
    }
};

actions.clearLogs = () => dispatch => {
    if (auth.loggedIn()) {
        post({ service: 'db', action: 'clear' })
            .then(response => (response ? dispatch(actions.setLogs([])) : null))
            .catch(() => dispatch(baseActions.showToast('Could not clear log data...')));
    }
};

actions.updatePosters = () => dispatch => {
    if (auth.loggedIn()) {
        post({ service: 'media', action: 'images', overwrite: false })
            .then(response => dispatch(baseActions.showToast(`Successfully updated ${response} posters!`)))
            .catch(() => dispatch(baseActions.showToast('Failed to update posters...')));
    }
};

actions.updateMedia = (type, count) => dispatch => {
    if (auth.loggedIn()) {
        post({ service: 'media', action: 'update', type, count })
            .then(response => dispatch(baseActions.showToast(`Successfully updated ${response} items!`)))
            .catch(() => dispatch(baseActions.showToast('Failed to update media content...')));
    }
};

actions.updateIata = type => dispatch => {
    if (auth.loggedIn()) {
        post({ service: 'iata', action: type })
            .then(response => dispatch(baseActions.showToast(`Successfully updated ${response} entries!`)))
            .catch(() => dispatch(baseActions.showToast('Failed to update IATA entries...')));
    }
};

actions.getNotes = () => dispatch => {
    if (auth.loggedIn()) {
        post({ service: 'notes', action: 'get' })
            .then(response => dispatch(actions.setNotes(response || [])))
            .catch(() => dispatch(baseActions.showToast('Could not fetch notes...')));
    }
};

actions.saveNote = (id, title, content) => dispatch => {
    if (auth.loggedIn()) {
        post({ service: 'notes', action: 'store', id, title, content })
            .then(() => {
                dispatch(baseActions.showToast('Successfully saved note!'));
                dispatch(actions.getNotes());
            })
            .catch(() => dispatch(baseActions.showToast('Could not store note...')));
    }
};

actions.deleteNote = id => dispatch => {
    if (auth.loggedIn()) {
        post({ service: 'notes', action: 'delete', id })
            .then(() => {
                dispatch(baseActions.showToast('Successfully deleted note!'));
                dispatch(actions.getNotes());
            })
            .catch(() => dispatch(baseActions.showToast('Could not delete note...')));
    }
};

export default actions;

export const reducer = makeReducer(actions);
