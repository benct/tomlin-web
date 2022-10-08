import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { useAppContext } from './context';
import { del, get, post } from '../util/api';
import { FinnState, GitHubState, HomeState } from '../interfaces';

export const useToast = (message?: string) => {
    const { setToast } = useAppContext();
    useEffect(() => {
        if (message) {
            setToast(message);
            setTimeout(() => {
                setToast(null);
            }, 3000);
        }
    }, [message, setToast]);
};

export const useHomeState = () => {
    const { data, error } = useSWR<HomeState, Error>('/hass/states', get, { revalidateOnFocus: false, errorRetryCount: 1 });

    useToast(error && 'Could not load server data...');

    return { data, loading: !error && !data };
};

export const useGitHub = () => {
    const { data, error } = useSWR<GitHubState, Error>('/github', get, { revalidateOnFocus: false, errorRetryCount: 0 });

    useToast(error && 'Could not load GitHub data...');

    return { data, loading: !error && !data };
};

export const useFinn = () => {
    const [toast, setToast] = useState<string>();
    const { data, error, mutate } = useSWR<FinnState, Error>('/finn', get, { revalidateOnFocus: false, errorRetryCount: 1 });

    useToast(error ? 'Could not load FINN data...' : toast);

    const add = (id: number) => {
        post(`/finn/${id}`)
            .then(() => {
                setToast(`Tracking id ${id}!`);
                mutate();
            })
            .catch(() => setToast('Could not add tracking id...'));
    };

    const remove = (id: number) => {
        del(`/finn/${id}`)
            .then(() => {
                setToast(`Tracking id ${id} removed!`);
                mutate();
            })
            .catch(() => setToast('Could not remove tracking id...'));
    };

    return { data, loading: !error && !data, add, remove };
};
