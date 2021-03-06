import { ActionsObject, makeAction, makeReducer } from '@finn-no/redux-actions';

import { DefaultState, ThunkResult } from '../interfaces';

import { quotes } from '../util/quotes';
import { del, get, post } from '../util/api';

const actions: ActionsObject<DefaultState> = {};

actions.toggleTheme = makeAction('BASE/TOGGLE_THEME', (state) => ({ ...state, theme: state.theme === 'default' ? 'midnight' : 'default' }));

actions.toggleMenu = makeAction('BASE/TOGGLE_MENU', (state) => ({ ...state, showMenu: !state.showMenu }));

actions.setLoading = makeAction('BASE/SET_LOADING', 'loading');

actions.setLoadingOverlay = makeAction('BASE/SET_LOADING_OVERLAY', 'loadingOverlay');

actions.setToast = makeAction('BASE/SET_TOAST', 'toast');

actions.refreshQuote = makeAction('BASE/REFRESH_QUOTE', (state) => ({
    ...state,
    quote: {
        text: quotes[state.quote.current][0],
        author: quotes[state.quote.current].length > 1 ? quotes[state.quote.current][1] : null,
        current: state.quote.current === quotes.length - 1 ? 0 : state.quote.current + 1,
    },
}));

actions.setSettings = makeAction('BASE/SET_SETTINGS', 'settings');

actions.setHomeState = makeAction('BASE/SET_HOME_STATE', 'home');

actions.setGitHubData = makeAction('BASE/SET_GITHUB_DATA', 'github');

actions.setFinnData = makeAction('BASE/SET_FINN_DATA', 'finn');

export const showToast = (payload: string): ThunkResult<Promise<void>> => async (dispatch): Promise<void> => {
    dispatch(actions.setToast(payload));

    await window.setTimeout(() => dispatch(actions.setToast(null)), 3000);
};

export const getHomeState = (): ThunkResult<Promise<void>> => async (dispatch): Promise<void> => {
    await get('/hass/states')
        .then((response) => dispatch(actions.setHomeState(response)))
        .catch(() => dispatch(showToast('Could not load server data...')));
};

export const getGitHubData = (): ThunkResult<Promise<void>> => async (dispatch): Promise<void> => {
    await get('/github')
        .then((data) => dispatch(actions.setGitHubData(data)))
        .catch(() => dispatch(showToast('Could not load GitHub data...')));
};

export const getFinnData = (): ThunkResult<Promise<void>> => async (dispatch): Promise<void> => {
    await get('/finn')
        .then((data) => dispatch(actions.setFinnData(data)))
        .catch(() => dispatch(showToast('Could not load FINN data...')));
};

export const storeFinnId = (id: number): ThunkResult<Promise<void>> => async (dispatch): Promise<void> => {
    await post(`/finn/${id}`)
        .then(() => {
            dispatch(getFinnData());
            dispatch(showToast(`Tracking id ${id}!`));
        })
        .catch(() => dispatch(showToast('Could not store tracking id...')));
};

export const deleteFinnId = (id: number): ThunkResult<Promise<void>> => async (dispatch): Promise<void> => {
    await del(`/finn/${id}`)
        .then(() => {
            dispatch(getFinnData());
            dispatch(showToast(`Tracking id ${id} removed!`));
        })
        .catch(() => dispatch(showToast('Could not delete tracking id...')));
};

export default actions;

export const reducer = makeReducer<DefaultState>(actions);
