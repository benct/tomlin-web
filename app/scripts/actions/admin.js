import makeAction from '../redux/makeAction.js';
import makeReducer from '../redux/makeReducer.js';

import { post } from '../util/api.js';
import baseActions from './base.js';
import auth from '../util/auth';

const actions = {};

actions.setLogs = makeAction('ADMIN/SET_LOGS', 'logs');

actions.getLogs = count => dispatch => {
    if (auth.loggedIn()) {
        post({ service: 'db', action: 'log', count })
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

export default actions;

export const reducer = makeReducer(actions);
