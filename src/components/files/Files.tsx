import { useEffect, useRef, useState } from 'react';
import { mdiClose, mdiFileDownloadOutline, mdiFolderPlusOutline, mdiFolderSyncOutline, mdiFolderUploadOutline } from '@mdi/js';

import { useFiles } from '@/data/files';

import { FileItem } from '@/interfaces';
import { Loading } from '@/components/page/Loading';
import { Button } from '@/components/page/Button';
import { Box } from '@/components/page/Box';
import { FileList } from './FileList';

const PARENT_DIR = '..';

export const Files = () => {
    const fileInput = useRef<HTMLInputElement>(null);

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
    };

    const closePreview = (): void => {
        view();
    };

    const downloadPreview = (): void => {
        if (preview?.item) download(preview.item);
    };

    const handleClick = (item: FileItem): void => {
        if (item.isDir) {
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
        <Box title="Files" className="min-h">
            <div className="flex gap-16 mb-16">
                <Button
                    text="Parent directory"
                    icon={mdiFolderUploadOutline}
                    onClick={() => changeDirectory(PARENT_DIR)}
                    disabled={cwd === ''}
                />
                <span className="flex-1" />
                <Button text="New directory" icon={mdiFolderPlusOutline} onClick={() => createDirectory()} />
                <Button text="Refresh content" icon={mdiFolderSyncOutline} onClick={() => refresh()} />
            </div>
            <Loading isLoading={loading} text="Loading file list...">
                <FileList
                    content={files}
                    focused={focused}
                    handleClick={handleClick}
                    handleRename={(item: FileItem) => rename(item)}
                    handleDelete={(item: FileItem) => remove(item)}
                />
            </Loading>
            <div className="text-center my-32 space-y-16">
                <input
                    className="input mx-auto"
                    type="file"
                    name="files[]"
                    id="file"
                    aria-label="Upload files"
                    ref={fileInput}
                    disabled={uploading}
                    multiple
                />
                <Button text={uploading ? 'Uploading...' : 'Upload'} onClick={handleUpload} disabled={uploading} className="mx-auto" />
            </div>
            {preview ? (
                <div className="bg-slate-900 bg-opacity-50 fixed inset-0 flex place-content-center place-items-center z-20">
                    <div className="absolute top-16 right-16 flex gap-24">
                        <Button text="Download" icon={mdiFileDownloadOutline} onClick={downloadPreview} />
                        <Button text="Close" icon={mdiClose} onClick={closePreview} />
                    </div>
                    {preview.type == 'image' ? (
                        <img className="max-w-full max-h-full" src={preview.content} alt="Preview" />
                    ) : preview.type == 'video' ? (
                        <video className="max-w-full max-h-full" controls>
                            <source src={preview.content} type={`video/${preview.item.ext}`} />
                        </video>
                    ) : (
                        <pre className="text-left text-12 overflow-auto border max-h-[90%] max-w-[90%] p-8 bg-light dark:bg-dark">
                            {preview.content}
                        </pre>
                    )}
                </div>
            ) : null}
        </Box>
    );
};
