import { ActionsObject, makeAction, makeReducer } from '@finn-no/redux-actions';

import { FileItem, FileState, ThunkResult } from '../interfaces';

import { blob, get, post, text } from '../util/api';
import { showToast } from './base';

const actions: ActionsObject<FileState> = {};

actions.setContent = makeAction('FILES/SET_DATA', 'content');

actions.setPreview = makeAction('FILES/SET_PREVIEW', 'preview');

actions.setFocus = makeAction('FILES/SET_FOCUS', 'focused');

actions.setUploading = makeAction('FILES/SET_UPLOADING', 'uploading');

actions.setDirectory = makeAction('FILES/CHANGE_DIR', (state, { payload }) => ({ ...state, cwd: payload, focused: null }));

export const refresh = (cwd?: string): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    await get('/file/tree', { path: cwd ?? getState().files.cwd })
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
        await post('/file/mkdir', { path: `${getState().files.cwd}/${name}` })
            .then(() => dispatch(refresh()))
            .catch(() => dispatch(showToast('Could not create directory...')));
    }
};

export const rename = (item: FileItem): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    const name = prompt('Enter new name of file:', item.name);
    if (name) {
        await post('/file/rename', { old: `${getState().files.cwd}/${item.name}`, new: name })
            .then(() => dispatch(refresh()))
            .catch(() => dispatch(showToast(`Could not rename ${item.dir ? 'directory' : 'file'}...`)));
    }
};

export const remove = (item: FileItem): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
        const action = item.dir ? 'rmdir' : 'remove';
        await post(`/file/${action}`, { path: `${getState().files.cwd}/${item.name}` })
            .then(() => dispatch(refresh()))
            .catch(() => dispatch(showToast(`Could not delete ${item.dir ? 'directory' : 'file'}...`)));
    }
};

export const upload = (files: FormData): ThunkResult<Promise<void>> => async (dispatch, getState): Promise<void> => {
    dispatch(actions.setUploading(true));

    await post('/file/upload', { path: getState().files.cwd }, files)
        .then(() => {
            dispatch(actions.setUploading(false));
            dispatch(refresh());
        })
        .catch(() => {
            dispatch(actions.setUploading(false));
            dispatch(showToast('An error occurred while uploading the file(s)...'));
        });
};

export const download = (item: FileItem): ThunkResult<Promise<void>> => async (dispatch): Promise<void> => {
    await blob('/file/download', { path: item.path })
        .then(blob => {
            if (typeof window.navigator?.msSaveOrOpenBlob !== 'undefined') {
                window.navigator.msSaveOrOpenBlob(blob, item.name);
                return;
            }

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            link.setAttribute('download', item.name);
            if (typeof link.download === 'undefined') {
                link.setAttribute('target', '_blank');
            }

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 100);
        })
        .catch(() => dispatch(showToast('Could not fetch file...')));
};

export const preview = (item: FileItem): ThunkResult<Promise<void>> => async (dispatch): Promise<void> => {
    if (item.preview == 'image' || item.preview == 'video') {
        await blob('/file/download', { path: item.path })
            .then(blob => dispatch(actions.setPreview({ content: window.URL.createObjectURL(blob), type: item.preview, item })))
            .catch(() => dispatch(showToast('Could not fetch image...')));
    } else {
        await text('/file/download', { path: item.path })
            .then(data => dispatch(actions.setPreview({ content: data, type: item.preview, item })))
            .catch(() => dispatch(showToast('Could not fetch content...')));
    }
};

export default actions;

export const reducer = makeReducer<FileState>(actions);
