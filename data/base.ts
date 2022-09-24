import useSWR from 'swr';
import { useEffect } from 'react';
import { useAppContext } from './context';
import { get } from '../util/api';
import { GitHubState, HomeState } from '../interfaces';

export const useToast = (message: string, error?: Error) => {
    const { setToast } = useAppContext();
    useEffect(() => {
        if (error) {
            setToast(message);
            setTimeout(() => {
                setToast(null);
            }, 3000);
        }
    }, [error, message, setToast]);
};

export const useHomeState = () => {
    const { data, error } = useSWR<HomeState, Error>('/hass/states', get, { revalidateOnFocus: false });

    useToast('Could not load server data...', error);

    return { data, loading: !error && !data };
};

export const useGitHub = () => {
    const { data, error } = useSWR<GitHubState, Error>('/github', get, { revalidateOnFocus: false });

    useToast('Could not load GitHub data...', error);

    return { data, loading: !error && !data };
};
