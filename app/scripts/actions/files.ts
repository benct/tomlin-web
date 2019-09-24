import { ActionsObject, makeAction, makeReducer } from '@finn-no/redux-actions';

import { FileItem, FileState, ThunkResult } from '../interfaces';

import { fetchFile, load } from '../util/api';
import { showToast } from './base';

const actions: ActionsObject<FileState> = {};

actions.setContent = makeAction('FILES/SET_DATA', 'content');

actions.setPreview = makeAction('FILES/SET_PREVIEW', 'preview');

actions.setFocus = makeAction('FILES/SET_FOCUS', 'focused');

actions.setUploading = makeAction('FILES/SET_UPLOADING', 'uploading');

actions.setDirectory = makeAction('FILES/CHANGE_DIR', (state, { payload }) => ({ ...state, cwd: payload, focused: null }));

export const refresh = (cwd?: string): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    await load({ service: 'files', action: 'ls', path: cwd || getState().files.cwd })
        .then(data => dispatch(actions.setContent(data)))
        .catch(() => dispatch(showToast('Could not fetch content...')));
};

export const changeDirectory = (dirname: string): ThunkResult<void> => (dispatch, getState): void => {
    let dir = getState().files.cwd;
    if (dirname === '..') {
        if (dir === '') return;
        dir = dir.substring(0, dir.lastIndexOf('/'));
    } else {
        dir += (dir === '' ? '' : '/') + dirname;
    }
    dispatch(actions.setDirectory(dir));
    dispatch(refresh(dir));
};

export const createDirectory = (): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    const name = prompt('Enter name of new folder:');
    if (name) {
        await load({ service: 'files', action: 'mkdir', path: `${getState().files.cwd}/${name}` })
            .then(() => dispatch(refresh()))
            .catch(() => dispatch(showToast('Could not create directory...')));
    }
};

export const rename = (item: FileItem): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    const name = prompt('Enter new name of file:', item.name);
    if (name) {
        await load({ service: 'files', action: 'mv', path: `${getState().files.cwd}/${item.name}`, name })
            .then(() => dispatch(refresh()))
            .catch(() => dispatch(showToast(`Could not rename ${item.dir ? 'directory' : 'file'}...`)));
    }
};

export const remove = (item: FileItem): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
        const action = item.dir ? 'rmdir' : 'rm';
        await load({ service: 'files', action: action, path: `${getState().files.cwd}/${item.name}` })
            .then(() => dispatch(refresh()))
            .catch(() => dispatch(showToast(`Could not delete ${item.dir ? 'directory' : 'file'}...`)));
    }
};

export const upload = (data: FormData): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    dispatch(actions.setUploading(true));

    await load({ service: 'files', action: 'up', path: getState().files.cwd }, data)
        .then(() => {
            dispatch(actions.setUploading(false));
            dispatch(refresh());
        })
        .catch(() => {
            dispatch(actions.setUploading(false));
            dispatch(showToast('An error occurred while uploading the file(s)...'));
        });
};

export const open = (item: FileItem): ThunkResult<Promise<void>> => async (dispatch): Promise<void> => {
    await fetchFile(item.href)
        .then(data => dispatch(actions.setPreview({ content: data, image: false })))
        .catch(() => dispatch(showToast('Could not fetch file...')));
};

export default actions;

export const reducer = makeReducer<FileState>(actions);
