import makeAction from './makeAction.js';
import makeReducer from './makeReducer.js';

import { get, post } from '../util/api.js';
import auth from '../util/auth.js';
import defaultState from './defaultState.js';

const actions = {};

actions.setLoggedIn = makeAction('SET_LOGGED_IN', 'isLoggedIn');

actions.toggleIcons = makeAction('TOGGLE_ICONS', state => Object.assign({}, state, { circleIcons: !state.circleIcons }));

actions.toggleMenu = makeAction('TOGGLE_MENU', state => Object.assign({}, state, { showMenu: !state.showMenu }));

actions.showToast = payload => dispatch => {
    dispatch(actions.setToast(payload));

    setTimeout(() => dispatch(actions.setToast(null)), 3000);
};

actions.setToast = makeAction('SET_TOAST', 'toast');

actions.setMedia = makeAction('MEDIA/SET', (state, { payload }) =>
    Object.assign({}, state, {
        media: {
            data: payload.result,
            stats: payload.stats,
        },
        pagination: {
            enabled: !!payload.page,
            current: payload.page ? payload.page.current : 1,
            total: payload.page ? payload.page.total : 1,
        },
    })
);

actions.clearMedia = makeAction('MEDIA/CLEAR', state => Object.assign({}, state, { media: defaultState.media }));

actions.getMedia = ({ type, page }) => (dispatch, getState) => {
    get({ service: 'media', action: type, page: page || getState().pagination.current })
        .then(response => dispatch(actions.setMedia(response)))
        .catch(() => {
            dispatch(actions.clearMedia());
            dispatch(actions.showToast('Could not fetch media content...'));
        });
};

actions.setFavourite = ({ type, itemType, id, set }) => dispatch => {
    if (auth.loggedIn()) {
        post({ service: 'media', action: 'favourite', type: itemType, id, set })
            .then(() => {
                dispatch(actions.getMedia({ type }));
                dispatch(actions.showToast(`${set ? 'Added to' : 'Removed from'} favourites!`));
            })
            .catch(() => dispatch(actions.showToast('Could not set favourite...')));
    }
};

actions.setSeen = ({ type, itemType, id, set }) => dispatch => {
    if (auth.loggedIn()) {
        post({ service: 'media', action: 'seen', type: itemType, id, set })
            .then(() => {
                dispatch(actions.getMedia({ type }));
                dispatch(actions.showToast(`Set as ${set ? 'seen' : 'unseen'}!`));
            })
            .catch(() => dispatch(actions.showToast('Could not set seen...')));
    }
};

export default actions;

export const reducer = makeReducer(actions);
