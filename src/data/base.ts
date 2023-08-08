import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { useAppContext } from './context';
import { del, get, post } from '@/util/api';
import { FinnState, GitHubState } from '@/interfaces';

export const useTheme = () => {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    useEffect(() => {
        if (window.localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        }
    }, []);

    const toggleTheme = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
        window.localStorage.setItem('theme', darkMode ? 'light' : 'dark');
        setDarkMode(!darkMode);
    };

    return { darkMode, toggleTheme };
};

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

export const useGitHub = () => {
    const { data, error, isLoading } = useSWR<GitHubState, Error>('/github', get, { revalidateOnFocus: false, errorRetryCount: 0 });

    useToast(error && 'Could not load GitHub data...');

    return { data, loading: isLoading };
};

export const useFinn = () => {
    const [toast, setToast] = useState<string>();
    const { data, error, isLoading, mutate } = useSWR<FinnState, Error>('/finn', get, { revalidateOnFocus: false, errorRetryCount: 1 });

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

    return { data, loading: isLoading, add, remove };
};
