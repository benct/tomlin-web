import useSWR from 'swr';
import { useState } from 'react';
import { useToast } from './base';
import { useAppContext } from './context';
import { del, get, post, query as getQuery } from '@/util/api';
import {
    MediaExisting,
    MediaExternal,
    MediaItemEntry,
    MediaProps,
    MediaSearchItemEntry,
    MediaSearchProps,
    MediaStats,
    MediaType,
    PaginationResponse,
} from '@/interfaces';

export const useMediaStats = () => {
    const { data, error, isLoading } = useSWR<MediaStats, Error>('/media', get, { revalidateOnFocus: false });

    useToast(error && 'Could not fetch media stats...');

    return { stats: data, loading: isLoading };
};

export const useMediaList = ({ type, page, sort, query }: MediaProps) => {
    const [toast, setToast] = useState<string>();
    const [selected, setSelected] = useState<MediaItemEntry>();

    const { isLoggedIn, setLoading } = useAppContext();
    const { data, error, isLoading, mutate } = useSWR<PaginationResponse<MediaItemEntry>, Error>(
        isLoggedIn ? [`/media/${type}`, { page, sort, query }] : null,
        getQuery,
        { revalidateOnFocus: false },
    );

    useToast(error ? 'Could not fetch media...' : toast);

    const selectItem = (type?: MediaType, id?: number) => {
        if (type && id) {
            setLoading(true);
            setToast(undefined);
            get<MediaItemEntry>(`/media/${type}/${id}`)
                .then((response) => setSelected(response))
                .catch(() => setToast('Could not fetch media content...'))
                .finally(() => setLoading(false));
        } else {
            setSelected(undefined);
        }
    };

    const update = (type: MediaType, id: number) => {
        setLoading(true);
        setToast(undefined);
        post(`/media/${type}/${id}`)
            .then(() => {
                selectItem(type, id);
                setToast('Media successfully updated!');
                mutate();
            })
            .catch(() => setToast('Failed to update media...'))
            .finally(() => setLoading(false));
    };

    const remove = (type: MediaType, id: number) => {
        if (confirm(`Are you sure you want to remove this?`)) {
            setLoading(true);
            setToast(undefined);
            del(`/media/${type}/${id}`)
                .then(() => {
                    setSelected(undefined);
                    setToast('Media successfully removed!');
                    mutate();
                })
                .catch(() => setToast('Failed to remove media...'))
                .finally(() => setLoading(false));
        }
    };

    const favourite = (type: MediaType, id: number, set: boolean) => {
        setLoading(true);
        setToast(undefined);
        post(`/media/${type}/favourite/${id}`, { set })
            .then(() => {
                if (selected) setSelected({ ...selected, favourite: set });
                setToast(`${set ? 'Added to' : 'Removed from'} favourites!`);
                mutate();
            })
            .catch(() => setToast('Could not set favourite...'))
            .finally(() => setLoading(false));
    };

    const seen = (type: MediaType, id: number, set: boolean) => {
        setLoading(true);
        setToast(undefined);
        post(`/media/${type}/seen/${id}`, { set })
            .then(() => {
                if (selected) setSelected({ ...selected, seen: set });
                setToast(`Set as ${set ? 'seen' : 'unseen'}!`);
                mutate();
            })
            .catch(() => setToast('Could not set seen...'))
            .finally(() => setLoading(false));
    };

    const seenEpisode = (type: MediaType, id: number, episodeId: number, set: boolean) => {
        setLoading(true);
        setToast(undefined);
        post(`/media/tv/seen/episode/${episodeId}`, { set })
            .then(() => {
                selectItem(type, id);
                setToast(`Set as ${set ? 'seen' : 'unseen'}!`);
            })
            .catch(() => setToast('Could not set seen...'))
            .finally(() => setLoading(false));
    };

    const seenEpisodes = (type: MediaType, id: number, seasonId: number) => {
        setLoading(true);
        setToast(undefined);
        post(`/media/tv/seen/season/${seasonId}`, { set: true })
            .then(() => {
                selectItem(type, id);
                setToast('All episodes set as seen');
            })
            .catch(() => setToast('Could not set seen...'))
            .finally(() => setLoading(false));
    };

    return {
        media: data?.results ?? [],
        pagination: {
            current: data?.page ?? 1,
            total: Math.min(data?.total_pages ?? 1, 500),
        },
        loading: isLoading,
        selected,
        selectItem,
        update,
        remove,
        favourite,
        seen,
        seenEpisode,
        seenEpisodes,
    };
};

export const useMediaSearch = ({ type, action, page, id }: MediaSearchProps) => {
    const [toast, setToast] = useState<string>();
    const [searchData, setSearchData] = useState<MediaSearchItemEntry[]>();

    const { isLoggedIn, setLoading } = useAppContext();
    const { data, error, isLoading } = useSWR<PaginationResponse<MediaSearchItemEntry>, Error>(
        isLoggedIn && type && action ? [`/media/${type}/${action}${id ? `/${id}` : ''}`, { page }] : null,
        getQuery,
        { revalidateOnFocus: false },
    );

    useToast(error ? 'Could not fetch media...' : toast);

    const search = (query?: string) => {
        if (query) {
            setLoading(true);
            setToast(undefined);
            get<PaginationResponse<MediaSearchItemEntry>>('/media/search', { query: encodeURI(query) })
                .then((response) => {
                    setSearchData(
                        response.results?.filter(
                            (item: MediaSearchItemEntry): boolean => item.media_type === 'movie' || item.media_type === 'tv',
                        ) ?? [],
                    );
                })
                .catch(() => setToast('Failed to execute search...'))
                .finally(() => setLoading(false));
        } else {
            setSearchData(undefined);
        }
    };

    return {
        media: searchData ?? data?.results ?? [],
        pagination: searchData
            ? { current: 1, total: 1 }
            : {
                  current: data?.page ?? 1,
                  total: Math.min(data?.total_pages ?? 1, 500),
              },
        loading: !!type && !!action && isLoading,
        search,
    };
};

export const useMediaSearchActions = () => {
    const [toast, setToast] = useState<string>();

    const { isLoggedIn, setLoading } = useAppContext();
    const { data, mutate } = useSWR<MediaExisting>(isLoggedIn ? '/media/existing' : null, get, { revalidateOnFocus: false });

    useToast(toast);

    const add = (type: MediaType, id: number) => {
        setLoading(true);
        setToast(undefined);
        post(`/media/${type}/${id}`)
            .then(() => {
                setToast('Media successfully added!');
                mutate();
            })
            .catch(() => setToast('Failed to add media...'))
            .finally(() => setLoading(false));
    };

    const remove = (type: MediaType, id: number) => {
        if (confirm(`Are you sure you want to remove this?`)) {
            setLoading(true);
            setToast(undefined);
            del(`/media/${type}/${id}`)
                .then(() => {
                    setToast('Media successfully removed!');
                    mutate();
                })
                .catch(() => setToast('Failed to remove media...'))
                .finally(() => setLoading(false));
        }
    };

    const imdb = (type: MediaType, id: number) => {
        setLoading(true);
        setToast(undefined);
        get<MediaExternal>(`/media/${type}/external/${id}`)
            .then((response) => {
                if (response && response.imdb_id) {
                    window.open(`https://www.imdb.com/title/${response.imdb_id}`, '_blank')?.focus();
                } else {
                    setToast('No external ID found...');
                }
            })
            .catch(() => setToast('Failed to get external ID...'))
            .finally(() => setLoading(false));
    };

    return { existing: data ?? { movie: [], tv: [] }, add, remove, imdb };
};
