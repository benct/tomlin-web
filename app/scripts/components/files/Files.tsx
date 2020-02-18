import React from 'react';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import {
    mdiCloseCircleOutline,
    mdiCloudUploadOutline,
    mdiFileDownloadOutline,
    mdiFolderPlusOutline,
    mdiFolderSyncOutline,
    mdiFolderUploadOutline,
} from '@mdi/js';

import { DefaultState, FileItem, FilePreview, ThunkDispatchProp } from '../../interfaces';
import fileActions, { changeDirectory, createDirectory, download, preview, refresh, remove, rename, upload } from '../../actions/files';

import Loading from '../page/Loading';
import FileList from './FileList';

import '../../../styles/files.css';

interface FilesProps {
    cwd: string;
    content: FileItem[];
    focused: number | null;
    preview: FilePreview | null;
    uploading: boolean;
    loading: boolean;
}

const PARENT_DIR = '..';

const Files: React.FC<FilesProps & ThunkDispatchProp> = props => {
    const fileInput = React.useRef<HTMLInputElement>(null);
    const fileLabel = React.useRef<HTMLLabelElement>(null);

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

        props.dispatch(upload(formData));

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
        props.dispatch(fileActions.setPreview(null));
    };

    const downloadPreview = (): void => {
        if (props.preview?.item) props.dispatch(download(props.preview.item));
    };

    const handleClick = (item: FileItem): void => {
        if (item.dir) {
            props.dispatch(changeDirectory(item.name));
        } else if (item.preview) {
            props.dispatch(preview(item));
        } else {
            props.dispatch(download(item));
        }
    };

    const handleKeyboard = (event: KeyboardEvent): void => {
        event.preventDefault();

        switch (event.keyCode) {
            case 8: // backspace
                props.dispatch(changeDirectory(PARENT_DIR));
                break;
            case 13: // enter
                if (props.focused !== null) {
                    handleClick(props.content[props.focused]);
                }
                break;
            case 27: // escape
                closePreview();
                break;
            case 38: // up
                if (props.focused === null) {
                    props.dispatch(fileActions.setFocus(0));
                } else if (props.focused > 0) {
                    props.dispatch(fileActions.setFocus(props.focused - 1));
                }
                break;
            case 40: // down
                if (props.focused === null) {
                    props.dispatch(fileActions.setFocus(0));
                } else if (props.focused < props.content.length - 1) {
                    props.dispatch(fileActions.setFocus(props.focused + 1));
                }
                break;
        }
    };

    React.useEffect(() => {
        props.dispatch(refresh());

        document.addEventListener('keyup', handleKeyboard, false);

        return (): void => document.removeEventListener('keyup', handleKeyboard, false);
    }, []);

    return (
        <>
            <div className="file-table-header">
                <button
                    className="button-icon"
                    onClick={(): void => props.dispatch(changeDirectory(PARENT_DIR))}
                    disabled={props.cwd === ''}>
                    <Icon path={mdiFolderUploadOutline} size="28px" title="Parent directory" />
                </button>
                <div className="text-right">
                    <button className="button-icon mrm" onClick={(): Promise<void> => props.dispatch(createDirectory())}>
                        <Icon path={mdiFolderPlusOutline} size="28px" title="New directory" />
                    </button>
                    <button className="button-icon" onClick={(): Promise<void> => props.dispatch(refresh())}>
                        <Icon path={mdiFolderSyncOutline} size="28px" title="Refresh content" />
                    </button>
                </div>
            </div>
            <Loading isLoading={props.loading} text="Loading file list...">
                <FileList
                    content={props.content}
                    focused={props.focused}
                    handleClick={handleClick}
                    handleRename={(item: FileItem): Promise<void> => props.dispatch(rename(item))}
                    handleDelete={(item: FileItem): Promise<void> => props.dispatch(remove(item))}
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
                        disabled={props.uploading}
                        multiple
                    />
                    <Icon path={mdiCloudUploadOutline} size="20px" title="Upload" />
                    <span className="mlm" ref={fileLabel}>
                        Choose a file
                    </span>
                </label>
                <button className="input text-small mtl" onClick={handleUpload} disabled={props.uploading}>
                    {props.uploading ? 'Uploading...' : 'Upload'}
                </button>
            </div>

            {props.preview ? (
                <div className="overlay">
                    <button className="button-blank" onClick={closePreview}>
                        <Icon path={mdiCloseCircleOutline} className="file-preview-icon file-preview-close" title="Close" color="white" />
                    </button>
                    <button className="button-blank" onClick={downloadPreview}>
                        <Icon
                            path={mdiFileDownloadOutline}
                            className="file-preview-icon file-preview-download"
                            title="Download"
                            color="white"
                        />
                    </button>
                    {props.preview.type == 'image' ? (
                        <img className="overlay-image" src={props.preview.content} alt="Preview" />
                    ) : props.preview.type == 'video' ? (
                        <video className="overlay-image" controls>
                            <source src={props.preview.content} type={`video/${props.preview.item.type}`} />
                        </video>
                    ) : (
                        <pre className="overlay-preview">{props.preview.content}</pre>
                    )}
                </div>
            ) : null}
        </>
    );
};

export default connect(
    (state: DefaultState): FilesProps => ({
        cwd: state.files.cwd,
        content: state.files.content,
        focused: state.files.focused,
        preview: state.files.preview,
        uploading: state.files.uploading,
        loading: state.loading,
    })
)(Files);
