import useSWR, { useSWRConfig } from 'swr';
import { useState } from 'react';
import { useToast } from './base';
import { useAppContext } from './context';
import { del, get, post } from '../util/api';
import { User } from '../interfaces';

export const useUsers = () => {
    const { isLoggedIn } = useAppContext();
    const { data, error } = useSWR<User[], Error>(isLoggedIn ? '/user' : null, get, { revalidateOnFocus: false });

    useToast(error && 'Could not fetch user data...');

    return { users: data ?? [], loading: !data && !error };
};

export const useUserActions = () => {
    const { mutate } = useSWRConfig();
    const { isLoggedIn } = useAppContext();
    const [toast, setToast] = useState<string>();

    useToast(toast);

    const saveUser = (email: string, name: string, password: string | null, enabled: boolean) => {
        if (isLoggedIn) {
            setToast(undefined);
            post('/user', { email, name, password, enabled })
                .then(() => {
                    setToast('Successfully saved user!');
                    mutate('/user');
                })
                .catch(() => setToast('Could not save user...'));
        }
    };

    const deleteUser = (email: string) => {
        if (isLoggedIn && confirm('Are you sure you want to delete this user?')) {
            setToast(undefined);
            del('/user', { email })
                .then(() => {
                    setToast('Successfully deleted user!');
                    mutate('/user');
                })
                .catch(() => setToast('Could not delete user...'));
        }
    };

    return { saveUser, deleteUser };
};
