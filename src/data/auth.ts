import useSWR from 'swr';
import { UrlObject } from 'url';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from './context';
import { auth } from '@/util/api';
import { Settings, Weather } from '@/interfaces';

interface AuthResponse {
    authenticated: boolean;
    database: boolean;
    settings: Settings;
    weather: Weather;
}

export const useInit = () => {
    const { data, error, isLoading } = useSWR<AuthResponse, Error>('/authenticate', auth, {
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

    return { api: !!data?.weather, database: !!data?.database, weather: data?.weather, loading: isLoading };
};

export const useLogin = (redirectTo?: string | UrlObject) => {
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
