import makeAction from '../redux/makeAction';
import makeReducer, { Actions } from '../redux/makeReducer';

import { AsyncAction, DefaultState } from '../interfaces';

import quotes from '../util/quotes';
import { get } from '../util/api';

const actions: Actions = {};

actions.toggleIcons = makeAction(
    'BASE/TOGGLE_ICONS',
    (state: DefaultState): DefaultState => ({ ...state, circleIcons: !state.circleIcons })
);

actions.toggleMenu = makeAction('BASE/TOGGLE_MENU', (state: DefaultState): DefaultState => ({ ...state, showMenu: !state.showMenu }));

actions.setLoading = makeAction('BASE/SET_LOADING', 'loading');

actions.setLoadingOverlay = makeAction('BASE/SET_LOADING_OVERLAY', 'loadingOverlay');

actions.setToast = makeAction('BASE/SET_TOAST', 'toast');

actions.showToast = (payload: string): AsyncAction => async (dispatch): Promise<void> => {
    dispatch(actions.setToast(payload));

    await window.setTimeout((): void => dispatch(actions.setToast(null)), 3000);
};

actions.refreshQuote = makeAction(
    'BASE/REFRESH_QUOTE',
    (state: DefaultState): DefaultState => ({
        ...state,
        quote: {
            text: quotes[state.quote.current][0],
            author: quotes[state.quote.current].length > 1 ? quotes[state.quote.current][1] : null,
            current: state.quote.current === quotes.length - 1 ? 0 : state.quote.current + 1,
        },
    })
);

actions.setHomeState = makeAction('BASE/SET_HOME_STATE', 'home');

actions.getHomeState = (): AsyncAction => async (dispatch): Promise<void> =>
    await get({ service: 'hass', action: 'state' }).then((response): void => dispatch(actions.setHomeState(response)));

export default actions;

export const reducer = makeReducer(actions);
