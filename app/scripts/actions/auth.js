import makeAction from '../redux/makeAction';
import makeReducer from '../redux/makeReducer';

import { _post } from '../util/api';

const actions = {};

actions.setLoggedIn = makeAction('AUTH/SET_LOGGED_IN', 'isLoggedIn');

actions.setAuthLoading = makeAction('AUTH/SET_LOADING', 'loading');

actions.setLoginState = makeAction('AUTH/SET_LOGIN_STATE', (state, { payload }) => ({ ...state, redirect: payload, error: !payload }));

actions.authenticate = data => dispatch => {
    dispatch(actions.setAuthLoading(true));

    _post({ service: 'auth', ...data })
        .then(response => (response ? Promise.resolve(response) : Promise.reject()))
        .then(token => {
            localStorage.token = token;
            dispatch(actions.setLoggedIn(true));
            if (data.action === 'login') {
                dispatch(actions.setLoginState(true));
            }
        })
        .catch(() => {
            delete localStorage.token;
            dispatch(actions.setLoggedIn(false));
            if (data.action === 'login') {
                dispatch(actions.setLoginState(false));
            }
        })
        .finally(() => dispatch(actions.setAuthLoading(false)));
};

actions.logout = () => dispatch => {
    delete localStorage.token;
    dispatch(actions.setLoggedIn(false));
};

export default actions;

export const reducer = makeReducer(actions);
