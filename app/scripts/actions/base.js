import makeAction from '../redux/makeAction';
import makeReducer from '../redux/makeReducer';

import quotes from '../util/quotes';
import { fetchFile, _get } from '../util/api';

const actions = {};

actions.toggleIcons = makeAction('BASE/TOGGLE_ICONS', state => ({ ...state, circleIcons: !state.circleIcons }));

actions.toggleMenu = makeAction('BASE/TOGGLE_MENU', state => ({ ...state, showMenu: !state.showMenu }));

actions.setToast = makeAction('BASE/SET_TOAST', 'toast');

actions.setLoading = makeAction('BASE/SET_LOADING', 'loading');

actions.showToast = payload => dispatch => {
    dispatch(actions.setToast(payload));

    window.setTimeout(() => dispatch(actions.setToast(null)), 3000);
};

actions.refreshQuote = makeAction('BASE/REFRESH_QUOTE', state => ({
    ...state,
    quote: {
        text: quotes[state.quote.current][0],
        author: quotes[state.quote.current].length > 1 ? quotes[state.quote.current][1] : null,
        current: state.quote.current === quotes.length - 1 ? 0 : state.quote.current + 1,
    },
}));

actions.setHomeState = makeAction('BASE/SET_HOME_STATE', 'home');

actions.getHomeState = () => dispatch =>
    _get({ service: 'hass', action: 'state' }).then(response => dispatch(actions.setHomeState(response)));

actions.setContent = makeAction('CONTENT/SET_DATA', (state, { payload }) => ({ ...state, [payload.field]: payload }));

actions.loadContent = ({ field, file }) => dispatch => {
    dispatch(actions.setContent({ field, content: null, loading: true }));

    fetchFile(`/assets/content/${file}`)
        .then(data => dispatch(actions.setContent({ field, content: data, loading: false })))
        .catch(() => {
            dispatch(actions.setContent({ field, content: null, loading: false }));
            dispatch(actions.showToast('Could not load file...'));
        });
};

export default actions;

export const reducer = makeReducer(actions);
