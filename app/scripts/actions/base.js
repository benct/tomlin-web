import makeAction from '../redux/makeAction.js';
import makeReducer from '../redux/makeReducer.js';

import quotes from '../util/quotes.js';
import { fetchFile } from '../util/api.js';

const actions = {};

actions.setLoggedIn = makeAction('AUTH/SET_LOGGED_IN', 'isLoggedIn');

actions.toggleIcons = makeAction('BASE/TOGGLE_ICONS', state => Object.assign({}, state, { circleIcons: !state.circleIcons }));

actions.toggleMenu = makeAction('BASE/TOGGLE_MENU', state => Object.assign({}, state, { showMenu: !state.showMenu }));

actions.setToast = makeAction('BASE/SET_TOAST', 'toast');

actions.setLoading = makeAction('BASE/SET_LOADING', 'loading');

actions.showToast = payload => dispatch => {
    dispatch(actions.setToast(payload));

    setTimeout(() => dispatch(actions.setToast(null)), 3000);
};

actions.refreshQuote = makeAction('BASE/REFRESH_QUOTE', state =>
    Object.assign({}, state, {
        quote: {
            text: quotes[state.quote.current][0],
            author: quotes[state.quote.current].length > 1 ? quotes[state.quote.current][1] : null,
            current: state.quote.current === quotes.length - 1 ? 0 : state.quote.current + 1,
        },
    })
);

actions.setLinkData = makeAction('CONTENT/SET_LINKS', 'links');
actions.setNoteData = makeAction('CONTENT/SET_NOTES', 'notes');

actions.loadContent = ({ type, file }) => dispatch => {
    const action = type === 'links' ? actions.setLinkData : actions.setNoteData;

    dispatch(action({ content: null, loading: true }));

    fetchFile(`/assets/content/${file}`)
        .then(data => dispatch(action({ content: data, loading: false })))
        .catch(() => {
            dispatch(action({ content: null, loading: false }));
            dispatch(actions.showToast('Could not load file...'));
        });
};

export default actions;

export const reducer = makeReducer(actions);
