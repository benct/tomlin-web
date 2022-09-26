import useSWR, { useSWRConfig } from 'swr';
import { useState } from 'react';
import { useToast } from './base';
import { useAppContext } from './context';
import { del, get, load, post } from '../util/api';
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
} from '../interfaces';

export const useMediaStats = () => {
    const { data, error } = useSWR<MediaStats, Error>('/media', get, { revalidateOnFocus: false });

    useToast(error && 'Could not fetch media stats...');

    return { stats: data, loading: !data && !error };
};

// TODO refactor/split? Extract selected?
export const useMediaList = ({ type, page, sort, query }: MediaProps) => {
    const [toast, setToast] = useState<string>();
    const [selected, setSelected] = useState<MediaItemEntry>();

    const { isLoggedIn } = useAppContext();
    const { data, error, mutate } = useSWR<PaginationResponse<MediaItemEntry>, Error>(
        isLoggedIn ? [`/media/${type}`, { page, sort, query }] : null,
        get,
        { revalidateOnFocus: false }
    );

    useToast(error ? 'Could not fetch media...' : toast);

    const selectItem = (type?: MediaType, id?: number) => {
        if (type && id) {
            load<MediaItemEntry>('GET', `/media/${type}/${id}`)
                .then((response) => setSelected(response))
                .catch(() => setToast('Could not fetch media content...'));
        } else {
            setSelected(undefined);
        }
    };

    const update = (type: MediaType, id: number) => {
        post(`/media/${type}/${id}`)
            .then(() => {
                selectItem(type, id);
                setToast('Media successfully updated!');
                mutate();
            })
            .catch(() => setToast('Failed to update media...'));
    };

    const remove = (type: MediaType, id: number) => {
        if (confirm(`Are you sure you want to remove this?`)) {
            del(`/media/${type}/${id}`)
                .then(() => {
                    setSelected(undefined);
                    setToast('Media successfully removed!');
                    mutate();
                })
                .catch(() => setToast('Failed to remove media...'));
        }
    };

    const favourite = (type: MediaType, id: number, set: boolean) => {
        post(`/media/${type}/favourite/${id}`, { set })
            .then(() => {
                if (selected) setSelected({ ...selected, favourite: set });
                setToast(`${set ? 'Added to' : 'Removed from'} favourites!`);
                mutate();
            })
            .catch(() => setToast('Could not set favourite...'));
    };

    const seen = (type: MediaType, id: number, set: boolean) => {
        post(`/media/${type}/seen/${id}`, { set })
            .then(() => {
                if (selected) setSelected({ ...selected, seen: set });
                setToast(`Set as ${set ? 'seen' : 'unseen'}!`);
                mutate();
            })
            .catch(() => setToast('Could not set seen...'));
    };

    const seenEpisode = (type: MediaType, id: number, episodeId: number, set: boolean) => {
        post(`/media/tv/seen/episode/${episodeId}`, { set })
            .then(() => {
                selectItem(type, id);
                setToast(`Set as ${set ? 'seen' : 'unseen'}!`);
            })
            .catch(() => setToast('Could not set seen...'));
    };

    const seenEpisodes = (type: MediaType, id: number, seasonId: number) => {
        post(`/media/tv/seen/season/${seasonId}`, { set: true })
            .then(() => {
                selectItem(type, id);
                setToast('All episodes set as seen');
            })
            .catch(() => setToast('Could not set seen...'));
    };

    return {
        media: data?.results ?? [],
        pagination: {
            current: data?.page ?? 1,
            total: data?.total_pages ?? 1,
        },
        loading: !data && !error,
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

    const { mutate } = useSWRConfig();
    const { isLoggedIn } = useAppContext();
    const { data, error } = useSWR<PaginationResponse<MediaSearchItemEntry>, Error>(
        isLoggedIn && type && action ? [`/media/${type}/${action}/${id ?? ''}`, { page }] : null,
        get,
        { revalidateOnFocus: false }
    );

    useToast(error ? 'Could not fetch media...' : toast);

    const search = (query?: string) => {
        if (query) {
            get<PaginationResponse<MediaSearchItemEntry>>('/media/search', { query: encodeURI(query) })
                .then((response) => {
                    setSearchData(
                        response.results?.filter(
                            (item: MediaSearchItemEntry): boolean => item.media_type === 'movie' || item.media_type === 'tv'
                        ) ?? []
                    );
                })
                .catch(() => setToast('Failed to execute search...'));
        } else {
            setSearchData(undefined);
        }
    };

    const add = (type: MediaType, id: number) => {
        post(`/media/${type}/${id}`)
            .then(() => {
                setToast('Media successfully added!');
                mutate('/media/existing');
            })
            .catch(() => setToast('Failed to add media...'));
    };

    const remove = (type: MediaType, id: number) => {
        if (confirm(`Are you sure you want to remove this?`)) {
            del(`/media/${type}/${id}`)
                .then(() => {
                    setToast('Media successfully removed!');
                    mutate('/media/existing');
                })
                .catch(() => setToast('Failed to remove media...'));
        }
    };

    const imdb = (type: MediaType, id: number) =>
        load<MediaExternal>('GET', `/media/${type}/external/${id}`)
            .then((response) => {
                if (response && response.imdb_id) {
                    window.open(`https://www.imdb.com/title/${response.imdb_id}`, '_blank')?.focus();
                } else {
                    setToast('No external ID found...');
                }
            })
            .catch(() => setToast('Failed to get external ID...'));

    return {
        media: searchData ?? data?.results ?? [],
        pagination: searchData
            ? { current: 1, total: 1 }
            : {
                  current: data?.page ?? 1,
                  total: Math.min(data?.total_pages ?? 1, 950),
              },
        loading: !!type && !!action && !data && !error,
        search,
        add,
        remove,
        imdb,
    };
};

export const useExisting = () => {
    const { isLoggedIn } = useAppContext();
    const { data } = useSWR<MediaExisting>(isLoggedIn ? '/media/existing' : null, get, { revalidateOnFocus: false });
    return data ?? { movie: [], tv: [] };
};
