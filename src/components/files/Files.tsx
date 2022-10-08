import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { Icon } from '@mdi/react';
import {
    mdiCloseCircleOutline,
    mdiCloudUploadOutline,
    mdiFileDownloadOutline,
    mdiFolderPlusOutline,
    mdiFolderSyncOutline,
    mdiFolderUploadOutline,
} from '@mdi/js';

import { useFiles } from '@/data/files';

import { FileItem } from '@/interfaces';
import { Loading } from '@/components/page/Loading';
import { FileList } from './FileList';

const PARENT_DIR = '..';

export const Files: FC = () => {
    const fileInput = useRef<HTMLInputElement>(null);
    const fileLabel = useRef<HTMLLabelElement>(null);

    const [focused, setFocus] = useState<number | null>(null);

    const { files, loading, cwd, uploading, preview, refresh, changeDirectory, createDirectory, rename, remove, upload, download, view } =
        useFiles();

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

        upload(formData);

        if (fileInput.current && fileLabel.current) {
            fileInput.current.value = '';
            fileLabel.current.innerHTML = 'Choose a file';
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
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
        view();
    };

    const downloadPreview = (): void => {
        if (preview?.item) download(preview.item);
    };

    const handleClick = (item: FileItem): void => {
        if (item.dir) {
            changeDirectory(item.name);
        } else if (item.preview) {
            view(item);
        } else {
            download(item);
        }
    };

    const handleKeyboard = (event: KeyboardEvent): void => {
        event.preventDefault();

        switch (event.keyCode) {
            case 8: // backspace
                changeDirectory(PARENT_DIR);
                break;
            case 13: // enter
                if (focused !== null) {
                    handleClick(files[focused]);
                }
                break;
            case 27: // escape
                closePreview();
                break;
            case 38: // up
                if (focused === null) {
                    setFocus(0);
                } else if (focused > 0) {
                    setFocus(focused - 1);
                }
                break;
            case 40: // down
                if (focused === null) {
                    setFocus(0);
                } else if (focused < files.length - 1) {
                    setFocus(focused + 1);
                }
                break;
        }
    };

    useEffect(() => {
        document.addEventListener('keyup', handleKeyboard, false);

        return (): void => document.removeEventListener('keyup', handleKeyboard, false);
    }, []);

    return (
        <div className="wrapper min-height ptm">
            <div className="file-table-header">
                <button className="button-icon" onClick={() => changeDirectory(PARENT_DIR)} disabled={cwd === ''}>
                    <Icon path={mdiFolderUploadOutline} size="28px" title="Parent directory" />
                </button>
                <div className="text-right">
                    <button className="button-icon mrl" onClick={() => createDirectory()}>
                        <Icon path={mdiFolderPlusOutline} size="28px" title="New directory" />
                    </button>
                    <button className="button-icon" onClick={() => refresh()}>
                        <Icon path={mdiFolderSyncOutline} size="28px" title="Refresh content" />
                    </button>
                </div>
            </div>
            <Loading isLoading={loading} text="Loading file list..." className="file-table">
                <FileList
                    content={files}
                    focused={focused}
                    handleClick={handleClick}
                    handleRename={(item: FileItem) => rename(item)}
                    handleDelete={(item: FileItem) => remove(item)}
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
                        disabled={uploading}
                        multiple
                    />
                    <Icon path={mdiCloudUploadOutline} size="20px" title="Upload" />
                    <span className="mlm" ref={fileLabel}>
                        Choose a file
                    </span>
                </label>
                <button className="input text-small mtl" onClick={handleUpload} disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </div>

            {preview ? (
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
                    {preview.type == 'image' ? (
                        <img className="overlay-image" src={preview.content} alt="Preview" />
                    ) : preview.type == 'video' ? (
                        <video className="overlay-image" controls>
                            <source src={preview.content} type={`video/${preview.item.type}`} />
                        </video>
                    ) : (
                        <pre className="overlay-preview">{preview.content}</pre>
                    )}
                </div>
            ) : null}
        </div>
    );
};
