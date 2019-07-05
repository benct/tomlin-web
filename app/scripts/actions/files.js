import makeAction from '../redux/makeAction';
import makeReducer from '../redux/makeReducer';

import { post, fetchFile } from '../util/api';

import baseActions from './base';

const actions = {};

actions.setContent = makeAction('FILES/SET_DATA', 'content');

actions.setPreview = makeAction('FILES/SET_PREVIEW', 'preview');

actions.setFocus = makeAction('FILES/SET_FOCUS', 'focused');

actions.setUploading = makeAction('FILES/SET_UPLOADING', 'uploading');

actions.setDirectory = makeAction('FILES/CHANGE_DIR', (state, { payload }) => ({ ...state, cwd: payload, focused: null }));

actions.refresh = cwd => (dispatch, getState) =>
    post({ service: 'files', action: 'ls', path: cwd || getState().files.cwd })
        .then(data => dispatch(actions.setContent(data)))
        .catch(() => dispatch(baseActions.showToast('Could not fetch content...')));

actions.changeDirectory = dirname => (dispatch, getState) => {
    let dir = getState().files.cwd;
    if (dirname === '..') {
        if (dir === '') return;
        dir = dir.substring(0, dir.lastIndexOf('/'));
    } else {
        dir += (dir === '' ? '' : '/') + dirname;
    }
    dispatch(actions.setDirectory(dir));
    dispatch(actions.refresh(dir));
};

actions.createDirectory = () => (dispatch, getState) => {
    const name = prompt('Enter name of new folder:');
    if (name) {
        post({ service: 'files', action: 'mkdir', path: `${getState().files.cwd}/${name}` })
            .then(() => dispatch(actions.refresh()))
            .catch(() => dispatch(baseActions.showToast('Could not create directory...')));
    }
};

actions.rename = item => (dispatch, getState) => {
    const name = prompt('Enter new name of file:', item.name);
    if (name) {
        post({ service: 'files', action: 'mv', path: `${getState().files.cwd}/${item.name}`, name: name })
            .then(() => dispatch(actions.refresh()))
            .catch(() => dispatch(baseActions.showToast(`Could not rename ${item.dir ? 'directory' : 'file'}...`)));
    }
};

actions.delete = item => (dispatch, getState) => {
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
        const action = item.dir ? 'rmdir' : 'rm';
        post({ service: 'files', action: action, path: `${getState().files.cwd}/${item.name}` })
            .then(() => dispatch(actions.refresh()))
            .catch(() => dispatch(baseActions.showToast(`Could not delete ${item.dir ? 'directory' : 'file'}...`)));
    }
};

actions.upload = data => (dispatch, getState) => {
    dispatch(actions.setUploading(true));

    post({ service: 'files', action: 'up', path: getState().files.cwd }, data)
        .then(() => {
            dispatch(actions.setUploading(false));
            dispatch(actions.refresh());
        })
        .catch(() => {
            dispatch(actions.setUploading(false));
            dispatch(baseActions.showToast('An error occurred while uploading the file(s)...'));
        });
};

actions.open = item => dispatch =>
    fetchFile(item.href)
        .then(data => dispatch(actions.setPreview({ content: data, image: false })))
        .catch(() => dispatch(baseActions.showToast('Could not fetch file...')));

export default actions;

export const reducer = makeReducer(actions);
