import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from './context';
import { auth } from '../util/api';
import { Settings } from '../interfaces';

interface AuthResponse {
    authenticated: boolean;
    settings: Settings;
}

export const useAuthenticate = () => {
    const { data, error } = useSWR<AuthResponse, Error>('/authenticate', auth, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
    });
    const { setIsLoggedIn, setSettings } = useAppContext();

    useEffect(() => {
        if (data) {
            setIsLoggedIn(data.authenticated);
            setSettings(data.settings);
        }
    }, [data, setIsLoggedIn, setSettings]);

    useEffect(() => {
        if (error) {
            setIsLoggedIn(false);
            window.localStorage.removeItem('token');
        }
    }, [error, setIsLoggedIn]);

    return { loading: !error && !data };
};

export const useLogin = (redirectTo?: string) => {
    const router = useRouter();
    const { setIsLoggedIn } = useAppContext();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const login = (username?: string, password?: string) => {
        setLoading(true);
        setError(false);

        window.localStorage.setItem('token', window.btoa(`${username}:${password}`));

        auth<string>('/login')
            .then((authenticated) => (authenticated ? Promise.resolve() : Promise.reject()))
            .then(() => {
                setIsLoggedIn(true);
                router.replace(redirectTo ?? '/');
            })
            .catch(() => {
                window.localStorage.removeItem('token');
                setIsLoggedIn(false);
                setError(true);
            })
            .finally(() => setLoading(false));
    };

    return { login, loading, error };
};

export const useLogout = () => {
    const router = useRouter();
    const { setIsLoggedIn } = useAppContext();

    return () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);

        setTimeout((): void => {
            router.replace('/');
        }, 3000);
    };
};
