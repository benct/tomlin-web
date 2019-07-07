import makeAction from '../redux/makeAction';
import makeReducer, { Actions } from '../redux/makeReducer';

import { AsyncAction, AuthState, InitAction } from '../interfaces';

import { _post } from '../util/api';

const actions: Actions = {};

actions.setLoggedIn = makeAction('AUTH/SET_LOGGED_IN', 'isLoggedIn');

actions.setAuthLoading = makeAction('AUTH/SET_LOADING', 'loading');

actions.setLoginData = makeAction(
    'AUTH/SET_LOGIN_DATA',
    (state: AuthState, { payload }): AuthState => ({ ...state, isLoggedIn: payload, redirect: payload, error: !payload })
);

actions.validate = (): AsyncAction => async (dispatch): Promise<void> => {
    await _post<string>({ service: 'auth', action: 'validate', referrer: document.referrer })
        .then((response): Promise<string> => (response ? Promise.resolve(response) : Promise.reject()))
        .then((token): void => {
            localStorage.token = token;
            dispatch(actions.setLoggedIn(true));
        })
        .catch((): void => {
            delete localStorage.token;
            dispatch(actions.setLoggedIn(false));
        });
};

actions.login = (data: object): AsyncAction => async (dispatch): Promise<void> => {
    dispatch(actions.setAuthLoading(true));

    await _post<string>({ service: 'auth', action: 'login', ...data })
        .then((response): Promise<string> => (response ? Promise.resolve(response) : Promise.reject()))
        .then((token): void => {
            localStorage.token = token;
            dispatch(actions.setLoginData(true));
        })
        .catch((): void => {
            delete localStorage.token;
            dispatch(actions.setLoginData(false));
        })
        .finally((): void => dispatch(actions.setAuthLoading(false)));
};

actions.logout = (): InitAction => (dispatch): void => {
    delete localStorage.token;
    dispatch(actions.setLoggedIn(false));
};

export default actions;

export const reducer = makeReducer(actions);
