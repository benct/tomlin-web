import makeAction from './makeAction.js';
import makeReducer from './makeReducer.js';

const actions = {};

actions.setLoggedIn = makeAction('SET_LOGGED_IN', 'isLoggedIn');

actions.toggleIcons = makeAction('TOGGLE_ICONS', state => Object.assign({}, state, { circleIcons: !state.circleIcons }));

actions.toggleMenu = makeAction('TOGGLE_MENU', state => Object.assign({}, state, { showMenu: !state.showMenu }));

actions.showToast = payload => dispatch => {
    dispatch(actions.setToast(payload));

    setTimeout(() => dispatch(actions.setToast(null)), 3000);
};

actions.setToast = makeAction('SET_TOAST', 'toast');

export default actions;

export const reducer = makeReducer(actions);
