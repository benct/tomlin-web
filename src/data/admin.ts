import useSWR from 'swr';
import { useState } from 'react';
import { useToast } from './base';
import { useAppContext } from './context';
import { del, get, post } from '@/util/api';
import { Hass, Log, PaginationResponse, Visit } from '@/interfaces';

export const useAdminStats = () => {
    const { data, error } = useSWR<Record<string, number>, Error>('/admin/stats', get);

    useToast(error && 'Could not fetch stats...');

    return { stats: data, loading: !error && !data };
};

export const useAdminActions = () => {
    const { isLoggedIn, setLoading } = useAppContext();
    const [toast, setToast] = useState<string>();
    const [hass, setHass] = useState<Hass[]>([]);

    useToast(toast);

    const saveSetting = (key: string, value: string | null) => {
        if (isLoggedIn && confirm('Are you sure you want to change this setting?')) {
            setLoading(true);
            setToast(undefined);
            post('/settings', { key, value })
                .then(() => setToast('Successfully saved settings!'))
                .catch(() => setToast('Could not save settings...'))
                .finally(() => setLoading(false));
        }
    };
    const clearLogs = () => {
        if (isLoggedIn && confirm('Are you sure you want to delete all logs?')) {
            setLoading(true);
            setToast(undefined);
            del('/admin/logs')
                .then((response) => (response ? setToast('Successfully cleared log data!') : Promise.reject()))
                .catch(() => setToast('Could not clear log data...'))
                .finally(() => setLoading(false));
        }
    };
    const updateMedia = (type: string, count: number | string = 10) => {
        if (isLoggedIn) {
            setLoading(true);
            setToast(undefined);
            post(`/media/${type}/update/${count}`)
                .then((response) => setToast(`Successfully updated ${response} items!`))
                .catch(() => setToast('Failed to update media content...'))
                .finally(() => setLoading(false));
        }
    };
    const updateIata = (type: string) => {
        if (isLoggedIn) {
            setLoading(true);
            setToast(undefined);
            post(`/iata/${type}`)
                .then((response) => setToast(`Successfully updated ${response} entries!`))
                .catch(() => setToast('Failed to update IATA entries...'))
                .finally(() => setLoading(false));
        }
    };
    const getHass = (count: number | string = 25) => {
        if (isLoggedIn) {
            setLoading(true);
            setToast(undefined);
            get<Hass[]>(`/hass/latest/${count}`)
                .then((response) => setHass(response ?? []))
                .catch(() => setToast('Could not fetch home-assistant data...'))
                .finally(() => setLoading(false));
        }
    };
    const backup = () => {
        if (isLoggedIn) {
            setLoading(true);
            setToast(undefined);
            post('/admin/backup')
                .then((response) => (response ? setToast('Successful backup!') : Promise.reject()))
                .catch(() => setToast('Backup process failed...'))
                .finally(() => setLoading(false));
        }
    };

    return { saveSetting, clearLogs, updateMedia, updateIata, backup, getHass, hass };
};

export const useVisits = (page: number) => {
    const { isLoggedIn } = useAppContext();
    const { data, error } = useSWR<PaginationResponse<Visit>, Error>(() => (isLoggedIn ? `/admin/visits/${page}` : null), get);

    useToast(error && 'Could not fetch visit data...');

    return {
        visits: data?.results ?? [],
        pagination: {
            current: data?.page ?? 1,
            total: data?.total_pages ?? 1,
        },
        loading: !error && !data,
    };
};

export const useLogs = (page: number) => {
    const { isLoggedIn, setLoading } = useAppContext();
    const { data, error, mutate } = useSWR<PaginationResponse<Log>, Error>(() => (isLoggedIn ? `/admin/logs/${page}` : null), get);
    const [toast, setToast] = useState<string>();

    useToast(error ? 'Could not fetch log data...' : toast);

    const deleteLog = (id: number) => {
        if (isLoggedIn && confirm('Are you sure you want to delete this entry?')) {
            setLoading(true);
            setToast(undefined);
            del(`/admin/logs/${id}`)
                .then((response) => {
                    if (response) mutate();
                })
                .catch(() => {
                    setToast('Could not clear log data...');
                })
                .finally(() => setLoading(false));
        }
    };

    return {
        logs: data?.results ?? [],
        pagination: {
            current: data?.page ?? 1,
            total: data?.total_pages ?? 1,
        },
        loading: !error && !data,
        deleteLog,
    };
};
