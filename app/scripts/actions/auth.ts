import makeAction from '../redux/makeAction';
import makeReducer, { Actions } from '../redux/makeReducer';

import { AsyncAction, AuthState, InitAction } from '../interfaces';

import { post } from '../util/api';

const actions: Actions = {};

actions.setLoggedIn = makeAction('AUTH/SET_LOGGED_IN', 'isLoggedIn');

actions.setLoading = makeAction('AUTH/SET_LOADING', 'loading');

actions.setLoginData = makeAction(
    'AUTH/SET_LOGIN_DATA',
    (state: AuthState, { payload }): AuthState => ({ ...state, ...payload, loading: false })
);

actions.validate = (): AsyncAction => async (dispatch): Promise<void> => {
    await post<string>({ service: 'auth', action: 'validate', referrer: document.referrer })
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
    dispatch(actions.setLoading(true));

    await post<string>({ service: 'auth', action: 'login', ...data })
        .then((response): Promise<string> => (response ? Promise.resolve(response) : Promise.reject()))
        .then((token): void => {
            localStorage.token = token;
            dispatch(actions.setLoginData({ isLoggedIn: true, redirect: true, error: false }));
        })
        .catch((): void => {
            delete localStorage.token;
            dispatch(actions.setLoginData({ isLoggedIn: false, redirect: false, error: true }));
        });
};

actions.logout = (): InitAction => (dispatch): void => {
    delete localStorage.token;
    dispatch(actions.setLoginData({ isLoggedIn: false, redirect: false }));
};

export default actions;

export const reducer = makeReducer(actions);
