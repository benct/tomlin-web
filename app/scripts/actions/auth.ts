import makeAction from '../redux/makeAction';
import makeReducer, { Actions } from '../redux/makeReducer';

import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AuthState } from '../interfaces';

import { _post } from '../util/api';

interface AuthData {
    action: string;
    user?: string;
    pass?: string;
}

const actions: Actions = {};

actions.setLoggedIn = makeAction('AUTH/SET_LOGGED_IN', 'isLoggedIn');

actions.setAuthLoading = makeAction('AUTH/SET_LOADING', 'loading');

actions.setLoginState = makeAction(
    'AUTH/SET_LOGIN_STATE',
    (state: AuthState, { payload }): AuthState => ({ ...state, redirect: payload, error: !payload })
);

actions.authenticate = (data: AuthData): ThunkAction<Promise<void>, AuthState, null, AnyAction> => async (dispatch): Promise<void> => {
    dispatch(actions.setAuthLoading(true));

    await _post<string>({ service: 'auth', ...data })
        .then((response): Promise<string> => (response ? Promise.resolve(response) : Promise.reject()))
        .then((token): void => {
            localStorage.token = token;
            dispatch(actions.setLoggedIn(true));
            if (data.action === 'login') {
                dispatch(actions.setLoginState(true));
            }
        })
        .catch((): void => {
            delete localStorage.token;
            dispatch(actions.setLoggedIn(false));
            if (data.action === 'login') {
                dispatch(actions.setLoginState(false));
            }
        })
        .finally((): void => dispatch(actions.setAuthLoading(false)));
};

actions.logout = (): ThunkAction<void, AuthState, null, AnyAction> => (dispatch): void => {
    delete localStorage.token;
    dispatch(actions.setLoggedIn(false));
};

export default actions;

export const reducer = makeReducer(actions);
