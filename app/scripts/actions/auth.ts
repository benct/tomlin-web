import { ActionsObject, makeAction, makeReducer } from '@finn-no/redux-actions';

import { AuthState, Settings, ThunkResult } from '../interfaces';

import { auth } from '../util/api';
import baseActions from './base';

interface ValidateResponse {
    authenticated: boolean;
    settings: Settings;
}

const actions: ActionsObject<AuthState> = {};

actions.setLoggedIn = makeAction('AUTH/SET_LOGGED_IN', 'isLoggedIn');

actions.setLoading = makeAction('AUTH/SET_LOADING', 'loading');

actions.setLoginData = makeAction('AUTH/SET_LOGIN_DATA', (state, { payload }) => ({ ...state, ...payload, loading: false }));

export const validate = (): ThunkResult<Promise<void>> => async (dispatch): Promise<void> =>
    await auth<ValidateResponse>('/authenticate')
        .then((response) => {
            dispatch(baseActions.setSettings(response.settings));
            return response.authenticated ? Promise.resolve() : Promise.reject();
        })
        .then(() => {
            dispatch(actions.setLoggedIn(true));
        })
        .catch(() => {
            localStorage.removeItem('token');
            dispatch(actions.setLoggedIn(false));
        });

export const login = (username?: string, password?: string): ThunkResult<Promise<void>> => async (dispatch): Promise<void> => {
    dispatch(actions.setLoading(true));
    localStorage.setItem('token', window.btoa(`${username}:${password}`));

    await auth<string>('/login')
        .then((authenticated) => (authenticated ? Promise.resolve() : Promise.reject()))
        .then(() => {
            dispatch(actions.setLoginData({ isLoggedIn: true, redirect: true, error: false }));
        })
        .catch(() => {
            localStorage.removeItem('token');
            dispatch(actions.setLoginData({ isLoggedIn: false, redirect: false, error: true }));
        });
};

export const logout = (): ThunkResult<void> => (dispatch): void => {
    localStorage.removeItem('token');
    dispatch(actions.setLoginData({ isLoggedIn: false, redirect: false }));
};

export default actions;

export const reducer = makeReducer<AuthState>(actions);
