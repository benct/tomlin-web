import { ActionsObject, makeAction, makeReducer } from '@finn-no/redux-actions';

import { AuthState, ThunkResult } from '../interfaces';

import { post } from '../util/api';

const actions: ActionsObject<AuthState> = {};

actions.setLoggedIn = makeAction('AUTH/SET_LOGGED_IN', 'isLoggedIn');

actions.setLoading = makeAction('AUTH/SET_LOADING', 'loading');

actions.setLoginData = makeAction('AUTH/SET_LOGIN_DATA', (state, { payload }) => ({ ...state, ...payload, loading: false }));

export const validate = (): ThunkResult<Promise<void>> => async (dispatch): Promise<void> =>
    await post<string>({ service: 'auth', action: 'validate', referrer: document.referrer })
        .then((response): Promise<string> => (response ? Promise.resolve(response) : Promise.reject()))
        .then(token => {
            localStorage.token = token;
            dispatch(actions.setLoggedIn(true));
        })
        .catch(() => {
            delete localStorage.token;
            dispatch(actions.setLoggedIn(false));
        });

export const login = (data: object): ThunkResult<Promise<void>> => async (dispatch): Promise<void> => {
    dispatch(actions.setLoading(true));

    await post<string>({ service: 'auth', action: 'login', ...data })
        .then((response): Promise<string> => (response ? Promise.resolve(response) : Promise.reject()))
        .then(token => {
            localStorage.token = token;
            dispatch(actions.setLoginData({ isLoggedIn: true, redirect: true, error: false }));
        })
        .catch(() => {
            delete localStorage.token;
            dispatch(actions.setLoginData({ isLoggedIn: false, redirect: false, error: true }));
        });
};

export const logout = (): ThunkResult<void> => (dispatch): void => {
    delete localStorage.token;
    dispatch(actions.setLoginData({ isLoggedIn: false, redirect: false }));
};

export default actions;

export const reducer = makeReducer<AuthState>(actions);
