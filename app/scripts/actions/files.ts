import makeAction from '../redux/makeAction';
import makeReducer, { Actions } from '../redux/makeReducer';

import { AsyncAction, FileItem, FileState, InitAction } from '../interfaces';

import { fetchFile, post } from '../util/api';
import baseActions from './base';

const actions: Actions = {};

actions.setContent = makeAction('FILES/SET_DATA', 'content');

actions.setPreview = makeAction('FILES/SET_PREVIEW', 'preview');

actions.setFocus = makeAction('FILES/SET_FOCUS', 'focused');

actions.setUploading = makeAction('FILES/SET_UPLOADING', 'uploading');

actions.setDirectory = makeAction('FILES/CHANGE_DIR', (state, { payload }): FileState => ({ ...state, cwd: payload, focused: null }));

actions.refresh = (cwd: string): AsyncAction => async (dispatch, getState): Promise<void> =>
    await post({ service: 'files', action: 'ls', path: cwd || getState().files.cwd })
        .then((data): void => dispatch(actions.setContent(data)))
        .catch((): void => dispatch(baseActions.showToast('Could not fetch content...')));

actions.changeDirectory = (dirname: string): InitAction => (dispatch, getState): void => {
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

actions.createDirectory = (): AsyncAction => async (dispatch, getState): Promise<void> => {
    const name = prompt('Enter name of new folder:');
    if (name) {
        await post({ service: 'files', action: 'mkdir', path: `${getState().files.cwd}/${name}` })
            .then((): void => dispatch(actions.refresh()))
            .catch((): void => dispatch(baseActions.showToast('Could not create directory...')));
    }
};

actions.rename = (item: FileItem): AsyncAction => async (dispatch, getState): Promise<void> => {
    const name = prompt('Enter new name of file:', item.name);
    if (name) {
        await post({ service: 'files', action: 'mv', path: `${getState().files.cwd}/${item.name}`, name })
            .then((): void => dispatch(actions.refresh()))
            .catch((): void => dispatch(baseActions.showToast(`Could not rename ${item.dir ? 'directory' : 'file'}...`)));
    }
};

actions.delete = (item: FileItem): AsyncAction => async (dispatch, getState): Promise<void> => {
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
        const action = item.dir ? 'rmdir' : 'rm';
        await post({ service: 'files', action: action, path: `${getState().files.cwd}/${item.name}` })
            .then((): void => dispatch(actions.refresh()))
            .catch((): void => dispatch(baseActions.showToast(`Could not delete ${item.dir ? 'directory' : 'file'}...`)));
    }
};

actions.upload = (data: FormData): AsyncAction => async (dispatch, getState): Promise<void> => {
    dispatch(actions.setUploading(true));

    await post({ service: 'files', action: 'up', path: getState().files.cwd }, data)
        .then((): void => {
            dispatch(actions.setUploading(false));
            dispatch(actions.refresh());
        })
        .catch((): void => {
            dispatch(actions.setUploading(false));
            dispatch(baseActions.showToast('An error occurred while uploading the file(s)...'));
        });
};

actions.open = (item: FileItem): AsyncAction => async (dispatch): Promise<void> =>
    await fetchFile(item.href)
        .then((data): void => dispatch(actions.setPreview({ content: data, image: false })))
        .catch((): void => dispatch(baseActions.showToast('Could not fetch file...')));

export default actions;

export const reducer = makeReducer(actions);
