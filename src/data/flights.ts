import useSWR, { useSWRConfig } from 'swr';
import { useState } from 'react';
import { useToast } from './base';
import { useAppContext } from './context';
import { del, get, post } from '@/util/api';
import { Flight } from '@/interfaces';

export const useFlights = () => {
    const { isLoggedIn } = useAppContext();
    const { data, error, isLoading } = useSWR<Flight[][], Error>(isLoggedIn ? '/flight' : null, get, { revalidateOnFocus: false });

    useToast(error && 'Could not fetch flights data...');

    return { flights: data ?? [], loading: isLoading };
};

export const useFlightActions = () => {
    const { mutate } = useSWRConfig();
    const { isLoggedIn, setLoading } = useAppContext();
    const [toast, setToast] = useState<string>();

    useToast(toast);

    const saveFlight = (data: Flight) => {
        if (isLoggedIn) {
            setLoading(true);
            setToast(undefined);
            post('/flight', data)
                .then(() => {
                    setToast('Successfully saved flight!');
                    mutate('/flight');
                })
                .catch(() => setToast('Could not save flight...'))
                .finally(() => setLoading(false));
        }
    };

    const deleteFlight = (id: number) => {
        if (isLoggedIn && confirm('Are you sure you want to delete this flight?')) {
            setLoading(true);
            setToast(undefined);
            del(`/flight/${id}`)
                .then(() => {
                    setToast('Successfully deleted flight!');
                    mutate('/flight');
                })
                .catch(() => setToast('Could not delete flight...'))
                .finally(() => setLoading(false));
        }
    };

    return { saveFlight, deleteFlight };
};
