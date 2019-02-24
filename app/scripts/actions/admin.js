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

export default actions;

export const reducer = makeReducer(actions);
