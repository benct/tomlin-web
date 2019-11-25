import { ActionsObject, makeAction, makeReducer } from '@finn-no/redux-actions';

import { DefaultState, ThunkResult } from '../interfaces';

import { quotes } from '../util/quotes';
import { get } from '../util/api';

const actions: ActionsObject<DefaultState> = {};

actions.toggleTheme = makeAction('BASE/TOGGLE_THEME', state => ({ ...state, theme: state.theme === 'default' ? 'midnight' : 'default' }));

actions.toggleMenu = makeAction('BASE/TOGGLE_MENU', state => ({ ...state, showMenu: !state.showMenu }));

actions.setLoading = makeAction('BASE/SET_LOADING', 'loading');

actions.setLoadingOverlay = makeAction('BASE/SET_LOADING_OVERLAY', 'loadingOverlay');

actions.setToast = makeAction('BASE/SET_TOAST', 'toast');

actions.refreshQuote = makeAction('BASE/REFRESH_QUOTE', state => ({
    ...state,
    quote: {
        text: quotes[state.quote.current][0],
        author: quotes[state.quote.current].length > 1 ? quotes[state.quote.current][1] : null,
        current: state.quote.current === quotes.length - 1 ? 0 : state.quote.current + 1,
    },
}));

actions.setHomeState = makeAction('BASE/SET_HOME_STATE', 'home');

export const showToast = (payload: string): ThunkResult<Promise<void>> => async (dispatch): Promise<void> => {
    dispatch(actions.setToast(payload));

    await window.setTimeout(() => dispatch(actions.setToast(null)), 3000);
};

export const getHomeState = (): ThunkResult<Promise<void>> => async (dispatch): Promise<void> => {
    dispatch(actions.setLoading(true));

    await get({ service: 'hass', action: 'state' })
        .then(response => dispatch(actions.setHomeState(response)))
        .finally(() => dispatch(actions.setLoading(false)));
};

export default actions;

export const reducer = makeReducer<DefaultState>(actions);
