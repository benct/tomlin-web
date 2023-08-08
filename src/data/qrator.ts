import { useState } from 'react';
import useSWR from 'swr';

import { del, get, post } from '@/util/api';
import { useAppContext } from './context';
import { useToast } from './base';
import { useRouter } from 'next/router';

export const useQRator = () => {
    const { isLoggedIn } = useAppContext();
    const [uploading, setUploading] = useState<boolean>(false);
    const [toast, setToast] = useState<string>();

    const { data, error, isLoading, mutate } = useSWR<Record<string, any>[], Error>('/qrator', get, { revalidateOnFocus: false });

    useToast(error ? 'Could not fetch data...' : toast);

    const upload = (files: FormData) => {
        if (!isLoggedIn) {
            return;
        }
        setUploading(true);
        setToast(undefined);
        post<number>('/qrator/upload', undefined, files)
            .then((res) => {
                setToast(`Successfully uploaded ${res} images!`);
                mutate();
            })
            .catch(() => setToast('Uploading failed...'))
            .finally(() => setUploading(false));
    };

    return { data: data ?? [], loading: isLoading, uploading, upload };
};

export const useQRatorItem = (id: number) => {
    const router = useRouter();
    const { isLoggedIn, setLoading } = useAppContext();
    const [toast, setToast] = useState<string>();

    const { data, error, isLoading, mutate } = useSWR<Record<string, any>, Error>(`/qrator/${id}`, get, { revalidateOnFocus: false });

    useToast(error ? 'Could not fetch data...' : toast);

    const saveItem = (id: number, data: Record<string, any>) => {
        if (isLoggedIn) {
            setLoading(true);
            setToast(undefined);
            post(`/qrator/${id}`, data)
                .then(() => {
                    setToast('Successfully saved image data!');
                    mutate();
                })
                .catch(() => setToast('Could not save image data...'))
                .finally(() => setLoading(false));
        }
    };

    const deleteItem = (id: number) => {
        if (isLoggedIn && confirm('Are you sure you want to delete this image?')) {
            setLoading(true);
            setToast(undefined);
            del(`/qrator/${id}`)
                .then(() => {
                    setToast('Successfully deleted image data!');
                    router.replace('/qrator');
                })
                .catch(() => setToast('Could not delete image data...'))
                .finally(() => setLoading(false));
        }
    };

    return { data, loading: isLoading, saveItem, deleteItem };
};
