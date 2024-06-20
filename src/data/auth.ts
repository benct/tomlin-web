import useSWR, { useSWRConfig } from 'swr';
import { UrlObject } from 'url';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from './context';
import { auth } from '@/util/api';

interface AuthResponse {
    authenticated: boolean;
    username: string | undefined;
    roles: string[];
}

export const useInit = () => {
    const { data, error } = useSWR<AuthResponse, Error>('/authenticate', auth, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
    });
    const { setIsLoggedIn, setRoles } = useAppContext();

    useEffect(() => {
        if (data) {
            setIsLoggedIn(data.authenticated);
            setRoles(data.roles.map((role) => role.toLowerCase()));
        }
    }, [data, setIsLoggedIn, setRoles]);

    useEffect(() => {
        if (error) {
            setIsLoggedIn(false);
            setRoles([]);
        }
    }, [error, setIsLoggedIn, setRoles]);
};

export const useLogin = (redirectTo?: string | UrlObject) => {
    const router = useRouter();
    const { mutate } = useSWRConfig();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const login = (username?: string, password?: string) => {
        setLoading(true);
        setError(false);

        window.localStorage.setItem('token', window.btoa(`${username}:${password}`));

        auth<string>('/login')
            .then((authenticated) => (authenticated ? Promise.resolve() : Promise.reject()))
            .then(() => {
                mutate('/authenticate');
                router.replace(redirectTo ?? '/');
            })
            .catch(() => {
                window.localStorage.removeItem('token');
                setError(true);
            })
            .finally(() => setLoading(false));
    };

    return { login, loading, error };
};

export const useLogout = () => {
    const router = useRouter();
    const { mutate } = useSWRConfig();

    return () => {
        localStorage.removeItem('token');
        mutate('/authenticate');

        setTimeout((): void => {
            router.replace('/');
        }, 3000);
    };
};
