import useSWR, { useSWRConfig } from 'swr';
import { useState } from 'react';
import { useToast } from './base';
import { useAppContext } from './context';
import { del, get, post } from '@/util/api';
import { Rating, RatingItem, RatingResult } from '@/interfaces';

export const useActiveRatings = () => {
    const { data, error } = useSWR<Rating, Error>('/rating', get, { refreshInterval: 15_000 });

    useToast(error && 'Could not fetch data...');

    return { data, loading: !data && !error };
};

export const useRatings = () => {
    const { isLoggedIn } = useAppContext();
    const { data, error } = useSWR<Rating[], Error>(isLoggedIn ? '/rating/all' : null, get, { revalidateOnFocus: false });

    useToast(error && 'Could not fetch rating data...');

    return { ratings: data ?? [], loading: !data && !error };
};

export const useRatingItems = (id: number) => {
    const { isLoggedIn } = useAppContext();
    const { data, error } = useSWR<RatingItem[], Error>(isLoggedIn ? `/rating/items/${id}` : null, get, { revalidateOnFocus: false });

    useToast(error && 'Could not fetch rating data...');

    return { items: data ?? [], loading: !data && !error };
};

export const useRatingResults = (id: number) => {
    const { isLoggedIn } = useAppContext();
    const { data, error } = useSWR<RatingResult[], Error>(isLoggedIn ? `/rating/result/${id}` : null, get, { refreshInterval: 15_000 });

    useToast(error && 'Could not fetch rating data...');

    return { results: data ?? [], loading: !data && !error };
};

export const useRatingActions = () => {
    const { mutate } = useSWRConfig();
    const { isLoggedIn, setLoading } = useAppContext();
    const [toast, setToast] = useState<string>();

    useToast(toast);

    const changeStep = (direction: 'next' | 'prev') => {
        setLoading(true);
        post(`/rating/${direction}`)
            .then(() => mutate('/rating/all'))
            .finally(() => setLoading(false));
    };

    const submitScore = (data: Record<string, any>) => {
        setLoading(true);
        setToast(undefined);
        post('/rating/score', data)
            .then(() => setToast('Success!'))
            .catch(() => setToast('Could not save rating...'))
            .finally(() => setLoading(false));
    };

    const saveRating = (data: Record<string, any>) => {
        if (isLoggedIn) {
            setLoading(true);
            setToast(undefined);
            post('/rating', data)
                .then(() => {
                    setToast('Successfully saved rating!');
                    mutate('/rating/all');
                })
                .catch(() => setToast('Could not save rating...'))
                .finally(() => setLoading(false));
        }
    };

    const deleteRating = (id: number) => {
        if (isLoggedIn && confirm('Are you sure you want to delete this rating?')) {
            setLoading(true);
            setToast(undefined);
            del(`/rating/${id}`)
                .then(() => {
                    setToast('Successfully deleted rating!');
                    mutate('/rating/all');
                })
                .catch(() => setToast('Could not delete rating...'))
                .finally(() => setLoading(false));
        }
    };

    const saveRatingItem = (ratingId: number, data: Record<string, any>) => {
        if (isLoggedIn) {
            setLoading(true);
            setToast(undefined);
            post('/rating/item', data)
                .then(() => {
                    setToast('Successfully saved rating item!');
                    mutate(`/rating/items/${ratingId}`);
                })
                .catch(() => setToast('Could not save rating item...'))
                .finally(() => setLoading(false));
        }
    };

    const deleteRatingItem = (ratingId: number, itemId: number) => {
        if (isLoggedIn) {
            setLoading(true);
            setToast(undefined);
            del(`/rating/item/${itemId}`)
                .then(() => {
                    setToast('Successfully deleted rating item!');
                    mutate(`/rating/items/${ratingId}`);
                })
                .catch(() => setToast('Could not deleted rating item...'))
                .finally(() => setLoading(false));
        }
    };

    return { changeStep, submitScore, saveRating, deleteRating, saveRatingItem, deleteRatingItem };
};
