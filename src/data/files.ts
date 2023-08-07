import useSWR from 'swr';
import { useState } from 'react';
import { useToast } from './base';
import { useAppContext } from './context';
import { blob, get, post, text } from '@/util/api';
import { FileItem, FilePreview } from '@/interfaces';

export const useFiles = () => {
    const [path, setPath] = useState<string>('');
    const [uploading, setUploading] = useState<boolean>(false);
    const [preview, setPreview] = useState<FilePreview>();
    const [toast, setToast] = useState<string>();

    const { isLoggedIn, setLoading } = useAppContext();
    const { data, error, isLoading, mutate } = useSWR<FileItem[], Error>(
        isLoggedIn ? ['/file/tree', { path }] : null,
        ([url, data]: [string, Record<string, string>]) => get<FileItem[]>(url, data),
        { revalidateOnFocus: false },
    );

    useToast(error ? 'Could not fetch files...' : toast);

    const changeDirectory = (dirname: string) => {
        let dir = `${path}`;
        if (dirname === '..') {
            if (dir === '') return;
            dir = dir.substring(0, dir.lastIndexOf('/'));
        } else {
            dir += (dir === '' ? '' : '/') + dirname;
        }
        setPath(dir);
        mutate();
    };

    const createDirectory = () => {
        const name = prompt('Enter name of new folder:');
        if (name) {
            setLoading(true);
            setToast(undefined);
            post('/file/mkdir', { path: `${path}/${name}` })
                .then(() => mutate())
                .catch(() => setToast('Could not create directory...'))
                .finally(() => setLoading(false));
        }
    };

    const rename = (item: FileItem) => {
        const name = prompt('Enter new name of file:', item.name);
        if (name) {
            setLoading(true);
            setToast(undefined);
            post('/file/rename', { old: `${path}/${item.name}`, new: name })
                .then(() => mutate())
                .catch(() => setToast(`Could not rename ${item.isDir ? 'directory' : 'file'}...`))
                .finally(() => setLoading(false));
        }
    };

    const remove = (item: FileItem) => {
        if (confirm(`Are you sure you want to delete ${item.name}?`)) {
            const action = item.isDir ? 'rmdir' : 'remove';
            setLoading(true);
            setToast(undefined);
            post(`/file/${action}`, { path: `${path}/${item.name}` })
                .then(() => mutate())
                .catch(() => setToast(`Could not delete ${item.isDir ? 'directory' : 'file'}...`))
                .finally(() => setLoading(false));
        }
    };

    const upload = (files: FormData) => {
        setUploading(true);

        setLoading(true);
        setToast(undefined);
        post('/file/upload', { path }, files)
            .then(() => {
                setUploading(false);
                mutate();
            })
            .catch(() => {
                setUploading(false);
                setToast('An error occurred while uploading the file(s)...');
            })
            .finally(() => setLoading(false));
    };

    const download = (item: FileItem) => {
        setLoading(true);
        setToast(undefined);
        blob('/file/download', { path: item.path })
            .then((blob) => {
                // if (typeof window.navigator?.msSaveOrOpenBlob !== 'undefined') {
                //     window.navigator.msSaveOrOpenBlob(blob, item.name);
                //     return;
                // }

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
            .catch(() => setToast('Could not fetch file...'))
            .finally(() => setLoading(false));
    };

    const view = (item?: FileItem) => {
        if (!item) {
            setPreview(undefined);
        } else if (item.preview == 'image' || item.preview == 'video') {
            setLoading(true);
            setToast(undefined);
            blob('/file/download', { path: item.path })
                .then((blob) => setPreview({ content: window.URL.createObjectURL(blob), type: item.preview, item }))
                .catch(() => setToast('Could not fetch image...'))
                .finally(() => setLoading(false));
        } else {
            setLoading(true);
            setToast(undefined);
            text('/file/download', { path: item.path })
                .then((data) => setPreview({ content: data, type: item.preview, item }))
                .catch(() => setToast('Could not fetch content...'))
                .finally(() => setLoading(false));
        }
    };

    return {
        files: data ?? [],
        loading: isLoading,
        cwd: path,
        uploading,
        preview,
        refresh: mutate,
        changeDirectory,
        createDirectory,
        rename,
        remove,
        upload,
        download,
        view,
    };
};
