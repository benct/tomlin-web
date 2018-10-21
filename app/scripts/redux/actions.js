/* global prompt, confirm */
import makeAction from './makeAction.js';
import makeReducer from './makeReducer.js';

import defaultState from './defaultState.js';
import auth from '../util/auth.js';
import quotes from '../util/quotes.js';
import pagination from '../util/pagination.js';
import { get, post, fetchFile } from '../util/api.js';

const merge = (state, payload) => Object.assign({}, state, payload);
const actions = {};

actions.setLoggedIn = makeAction('AUTH/SET_LOGGED_IN', 'isLoggedIn');

actions.toggleIcons = makeAction('BASE/TOGGLE_ICONS', state => merge(state, { circleIcons: !state.circleIcons }));

actions.toggleMenu = makeAction('BASE/TOGGLE_MENU', state => merge(state, { showMenu: !state.showMenu }));

actions.showToast = payload => dispatch => {
    dispatch(actions.setToast(payload));

    setTimeout(() => dispatch(actions.setToast(null)), 3000);
};

actions.setToast = makeAction('BASE/SET_TOAST', 'toast');

actions.refreshQuote = makeAction('BASE/REFRESH_QUOTE', state =>
    merge(state, {
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

actions.setFileData = makeAction('FILES/SET_DATA', (state, { payload }) =>
    merge(state, { files: merge(state.files, { content: payload }) })
);

actions.setDirectory = makeAction('FILES/CHANGE_DIR', (state, { payload }) =>
    merge(state, { files: merge(state.files, { cwd: payload, focused: null }) })
);

actions.setFilePreview = makeAction('FILES/SET_PREVIEW', (state, { payload }) =>
    merge(state, { files: merge(state.files, { preview: payload }) })
);

actions.setFileFocus = makeAction('FILES/SET_FOCUS', (state, { payload }) =>
    merge(state, { files: merge(state.files, { focused: payload }) })
);

actions.setFileUploading = makeAction('FILES/SET_UPLOADING', (state, { payload }) =>
    merge(state, { files: merge(state.files, { uploading: payload }) })
);

actions.refreshFiles = cwd => (dispatch, getState) =>
    post({ service: 'fs', action: 'ls', path: cwd || getState().files.cwd })
        .then(data => dispatch(actions.setFileData(data)))
        .catch(() => dispatch(actions.showToast('Could not fetch content...')));

actions.changeDirectory = dirname => (dispatch, getState) => {
    let dir = getState().files.cwd;
    if (dirname === '..') {
        if (dir === '') return;
        dir = dir.substring(0, dir.lastIndexOf('/'));
    } else {
        dir += (dir === '' ? '' : '/') + dirname;
    }
    dispatch(actions.setDirectory(dir));
    dispatch(actions.refreshFiles(dir));
};

actions.createDirectory = () => (dispatch, getState) => {
    const name = prompt('Enter name of new folder:');
    if (name) {
        post({ service: 'fs', action: 'mkdir', path: `${getState().files.cwd}/${name}` })
            .then(() => dispatch(actions.refreshFiles()))
            .catch(() => dispatch(actions.showToast('Could not create directory...')));
    }
};

actions.renameFile = item => (dispatch, getState) => {
    const name = prompt('Enter new name of file:', item.name);
    if (name) {
        post({ service: 'fs', action: 'mv', path: `${getState().files.cwd}/${item.name}`, name: name })
            .then(() => dispatch(actions.refreshFiles()))
            .catch(() => dispatch(actions.showToast(`Could not rename ${item.dir ? 'directory' : 'file'}...`)));
    }
};

actions.deleteFile = item => (dispatch, getState) => {
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
        const action = item.dir ? 'rmdir' : 'rm';
        post({ service: 'fs', action: action, path: `${getState().files.cwd}/${item.name}` })
            .then(() => dispatch(actions.refreshFiles()))
            .catch(() => dispatch(actions.showToast(`Could not delete ${item.dir ? 'directory' : 'file'}...`)));
    }
};

actions.uploadFile = data => (dispatch, getState) => {
    dispatch(actions.setFileUploading(true));

    post({ service: 'fs', action: 'up', path: getState().files.cwd }, data)
        .then(() => {
            dispatch(actions.setFileUploading(false));
            dispatch(actions.refreshFiles());
        })
        .catch(() => {
            dispatch(actions.setFileUploading(false));
            dispatch(actions.showToast('An error occurred while uploading the file(s)...'));
        });
};

actions.showFile = item => dispatch =>
    fetchFile(item.href)
        .then(data => dispatch(actions.setFilePreview({ content: data, image: false })))
        .catch(() => dispatch(actions.showToast('Could not fetch file...')));

actions.setMedia = makeAction('MEDIA/SET', (state, { payload }) => merge(state, { media: merge(state.media, payload) }));

actions.clearMedia = makeAction('MEDIA/CLEAR', state => merge(state, { media: defaultState.media }));

actions.setPagination = makeAction('PAGINATION/SET', (state, { payload }) =>
    merge(state, { pagination: pagination(payload.total, payload.current) })
);

actions.resetPagination = makeAction('PAGINATION/RESET', state => merge(state, { pagination: defaultState.pagination }));

actions.getMedia = ({ action, page }) => (dispatch, getState) =>
    get({ service: 'media', action, page: page || getState().pagination.current })
        .then(response => {
            dispatch(
                actions.setMedia({
                    list: response.results || [],
                    stats: response.stats,
                })
            );
            dispatch(actions.setPagination({ current: response.page, total: response.total_pages }));
        })
        .catch(() => {
            dispatch(actions.clearMedia());
            dispatch(actions.resetPagination());
            dispatch(actions.showToast('Could not fetch media content...'));
        });

actions.postMedia = ({ action, type, page }) => (dispatch, getState) =>
    post({ service: 'media', action, type, page: page || getState().pagination.current })
        .then(response => {
            dispatch(
                actions.setMedia({
                    search: response.results || [],
                    existing: response.existing,
                })
            );
            dispatch(actions.setPagination({ current: response.page, total: Math.min(response.total_pages, 1000) }));
        })
        .catch(() => {
            dispatch(actions.clearMedia());
            dispatch(actions.resetPagination());
            dispatch(actions.showToast('Could not fetch media content...'));
        });

actions.searchMedia = payload => dispatch =>
    post({ service: 'media', action: 'search', query: encodeURI(payload) })
        .then(response => {
            dispatch(
                actions.setMedia({
                    search: response.results
                        ? response.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv')
                        : [],
                    existing: response.existing,
                })
            );
            dispatch(actions.resetPagination());
        })
        .catch(() => dispatch(actions.showToast('Failed to execute search...')));

actions.addMedia = ({ type, id }) => dispatch =>
    post({ service: 'media', action: 'save', type, id })
        .then(() => dispatch(actions.showToast('Media successfully added!')))
        .catch(() => dispatch(actions.showToast('Failed to add media...')));

actions.removeMedia = ({ type, id }) => dispatch =>
    post({ service: 'media', action: 'delete', type, id })
        .then(() => dispatch(actions.showToast('Media successfully removed!')))
        .catch(() => dispatch(actions.showToast('Failed to remove media...')));

actions.setFavourite = ({ action, type, id, set }) => dispatch => {
    if (auth.loggedIn()) {
        post({ service: 'media', action: 'favourite', type, id, set })
            .then(() => {
                dispatch(actions.getMedia({ action }));
                dispatch(actions.showToast(`${set ? 'Added to' : 'Removed from'} favourites!`));
            })
            .catch(() => dispatch(actions.showToast('Could not set favourite...')));
    }
};

actions.setSeen = ({ action, type, id, set }) => dispatch => {
    if (auth.loggedIn()) {
        post({ service: 'media', action: 'seen', type, id, set })
            .then(() => {
                dispatch(actions.getMedia({ action }));
                dispatch(actions.showToast(`Set as ${set ? 'seen' : 'unseen'}!`));
            })
            .catch(() => dispatch(actions.showToast('Could not set seen...')));
    }
};

actions.goToIMDb = ({ type, id }) => dispatch =>
    post({ service: 'media', action: 'external', type, id })
        .then(
            response =>
                response
                    ? window.open(`https://www.imdb.com/title/${response}`, '_blank').focus()
                    : dispatch(actions.showToast('No external ID found...'))
        )
        .catch(() => dispatch(actions.showToast('Failed to get external ID...')));

actions.updatePosters = () => dispatch =>
    post({ service: 'media', action: 'images', overwrite: false })
        .then(response => dispatch(actions.showToast(`Successfully updated ${response} posters!`)))
        .catch(() => dispatch(actions.showToast('Failed to update posters...')));

export default actions;

export const reducer = makeReducer(actions);
