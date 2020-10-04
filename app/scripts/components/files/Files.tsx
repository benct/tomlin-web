import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@mdi/react';
import {
    mdiCloseCircleOutline,
    mdiCloudUploadOutline,
    mdiFileDownloadOutline,
    mdiFolderPlusOutline,
    mdiFolderSyncOutline,
    mdiFolderUploadOutline,
} from '@mdi/js';

import { DefaultState, FileItem, FileState } from '../../interfaces';
import fileActions, { changeDirectory, createDirectory, download, preview, refresh, remove, rename, upload } from '../../actions/files';

import Loading from '../page/Loading';
import FileList from './FileList';

import '../../../styles/files.css';

const PARENT_DIR = '..';

const Files: React.FC = () => {
    const fileInput = useRef<HTMLInputElement>(null);
    const fileLabel = useRef<HTMLLabelElement>(null);

    const dispatch = useDispatch();
    const state = useSelector<DefaultState, FileState & Pick<DefaultState, 'loading'>>((state) => ({
        ...state.files,
        loading: state.loading,
    }));

    const handleUpload = (): void => {
        const files = fileInput.current?.files ?? [];
        if (!files.length) {
            return;
        }

        const formData = new FormData();
        for (const key in files) {
            if (Object.prototype.hasOwnProperty.call(files, key) && files[key] instanceof File) {
                formData.append('files', files[key]);
            }
        }

        dispatch(upload(formData));

        if (fileInput.current && fileLabel.current) {
            fileInput.current.value = '';
            fileLabel.current.innerHTML = 'Choose a file';
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (fileLabel.current) {
            if (fileInput.current?.files && fileInput.current.files.length > 1) {
                fileLabel.current.innerHTML = `${fileInput.current.files.length} files selected`;
            } else if (event.target.value) {
                fileLabel.current.innerHTML = event.target.value.split('\\').pop() ?? '1 file selected';
            } else {
                fileLabel.current.innerHTML = 'Choose a file';
            }
        }
    };

    const closePreview = (): void => {
        dispatch(fileActions.setPreview(null));
    };

    const downloadPreview = (): void => {
        if (state.preview?.item) dispatch(download(state.preview.item));
    };

    const handleClick = (item: FileItem): void => {
        if (item.dir) {
            dispatch(changeDirectory(item.name));
        } else if (item.preview) {
            dispatch(preview(item));
        } else {
            dispatch(download(item));
        }
    };

    const handleKeyboard = (event: KeyboardEvent): void => {
        event.preventDefault();

        switch (event.keyCode) {
            case 8: // backspace
                dispatch(changeDirectory(PARENT_DIR));
                break;
            case 13: // enter
                if (state.focused !== null) {
                    handleClick(state.content[state.focused]);
                }
                break;
            case 27: // escape
                closePreview();
                break;
            case 38: // up
                if (state.focused === null) {
                    dispatch(fileActions.setFocus(0));
                } else if (state.focused > 0) {
                    dispatch(fileActions.setFocus(state.focused - 1));
                }
                break;
            case 40: // down
                if (state.focused === null) {
                    dispatch(fileActions.setFocus(0));
                } else if (state.focused < state.content.length - 1) {
                    dispatch(fileActions.setFocus(state.focused + 1));
                }
                break;
        }
    };

    useEffect(() => {
        dispatch(refresh());

        document.addEventListener('keyup', handleKeyboard, false);

        return (): void => document.removeEventListener('keyup', handleKeyboard, false);
    }, []);

    return (
        <>
            <div className="file-table-header">
                <button className="button-icon" onClick={() => dispatch(changeDirectory(PARENT_DIR))} disabled={state.cwd === ''}>
                    <Icon path={mdiFolderUploadOutline} size="28px" title="Parent directory" />
                </button>
                <div className="text-right">
                    <button className="button-icon mrl" onClick={() => dispatch(createDirectory())}>
                        <Icon path={mdiFolderPlusOutline} size="28px" title="New directory" />
                    </button>
                    <button className="button-icon" onClick={() => dispatch(refresh())}>
                        <Icon path={mdiFolderSyncOutline} size="28px" title="Refresh content" />
                    </button>
                </div>
            </div>
            <Loading isLoading={state.loading} text="Loading file list..." className="file-table">
                <FileList
                    content={state.content}
                    focused={state.focused}
                    handleClick={handleClick}
                    handleRename={(item: FileItem) => dispatch(rename(item))}
                    handleDelete={(item: FileItem) => dispatch(remove(item))}
                />
            </Loading>
            <div className="text-center">
                <label htmlFor="file" className="color-primary pointer">
                    <input
                        className="input input-file"
                        type="file"
                        name="files[]"
                        id="file"
                        aria-label="Add files"
                        onChange={handleFileChange}
                        ref={fileInput}
                        disabled={state.uploading}
                        multiple
                    />
                    <Icon path={mdiCloudUploadOutline} size="20px" title="Upload" />
                    <span className="mlm" ref={fileLabel}>
                        Choose a file
                    </span>
                </label>
                <button className="input text-small mtl" onClick={handleUpload} disabled={state.uploading}>
                    {state.uploading ? 'Uploading...' : 'Upload'}
                </button>
            </div>

            {state.preview ? (
                <div className="overlay">
                    <button className="button-icon" onClick={closePreview}>
                        <Icon path={mdiCloseCircleOutline} className="file-preview-icon file-preview-close" title="Close" color="white" />
                    </button>
                    <button className="button-icon" onClick={downloadPreview}>
                        <Icon
                            path={mdiFileDownloadOutline}
                            className="file-preview-icon file-preview-download"
                            title="Download"
                            color="white"
                        />
                    </button>
                    {state.preview.type == 'image' ? (
                        <img className="overlay-image" src={state.preview.content} alt="Preview" />
                    ) : state.preview.type == 'video' ? (
                        <video className="overlay-image" controls>
                            <source src={state.preview.content} type={`video/${state.preview.item.type}`} />
                        </video>
                    ) : (
                        <pre className="overlay-preview">{state.preview.content}</pre>
                    )}
                </div>
            ) : null}
        </>
    );
};

export default Files;
