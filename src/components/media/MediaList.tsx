import { ChangeEvent, KeyboardEvent } from 'react';
import { useRouter } from 'next/router';

import { formatQuery } from '@/util/formatting';
import { useMediaList } from '@/data/media';

import { MediaItemEntry, MediaProps } from '@/interfaces';
import { Loading } from '@/components/page/Loading';
import { Pagination } from '@/components/page/Pagination';
import { Box } from '@/components/page/Box';
import { MediaModal } from './MediaModal';
import { MediaItem } from './MediaItem';

export const MediaList = ({ type, page, sort, query }: MediaProps) => {
    const router = useRouter();
    const { media, pagination, loading, selected, selectItem, update, remove, favourite, seen, seenEpisode, seenEpisodes, removeEpisode } =
        useMediaList({ type, page, sort, query });

    const handleKey = (event: KeyboardEvent<HTMLInputElement>): void => {
        if ((event.keyCode === 13 || event.key === 'Enter') && event.target) {
            const target = event.target as HTMLInputElement;
            router.push({ pathname: router.pathname, query: { ...router.query, query: target.value } });
        }
    };

    const handleSort = (event: ChangeEvent<HTMLSelectElement>): void => {
        if (sort !== event.target.value) {
            router.push({ pathname: router.pathname, query: { ...router.query, sort: event.target.value } });
        }
    };

    const renderRow = (item: MediaItemEntry) => (
        <MediaItem
            key={`mediaItem${item.id}`}
            data={item}
            type={item.type ?? type}
            showItem={() => selectItem(item.type ?? type, item.id)}
            setSeen={() => seen(item.type ?? type, item.id, !item.seen)}
            setFavourite={() => favourite(item.type ?? type, item.id, !item.favourite)}
        />
    );

    const renderModal = (item: MediaItemEntry) => (
        <MediaModal
            data={item}
            type={item.type ?? type}
            close={() => selectItem()}
            update={() => update(item.type ?? type, item.id)}
            remove={() => remove(item.type ?? type, item.id)}
            setSeen={() => seen(item.type ?? type, item.id, !item.seen)}
            setFavourite={() => favourite(item.type ?? type, item.id, !item.favourite)}
            setSeenEpisode={(episodeId: number, set: boolean) => seenEpisode(item.type ?? type, item.id, episodeId, set)}
            setSeenEpisodes={(seasonId: number, set: boolean) => seenEpisodes(item.type ?? type, item.id, seasonId, set)}
            removeEpisode={(episodeId: number) => removeEpisode(item.type ?? type, item.id, episodeId)}
        />
    );

    const renderWatchlist = (data: MediaItemEntry[]) => (
        <Loading isLoading={loading} text="Loading media...">
            <div className="mb-16 font-bold">TV-Shows:</div>
            <div className="grid sm:grid-cols-2 gap-16">
                {data.filter((item: MediaItemEntry): boolean => item.type === 'tv').map(renderRow)}
            </div>
            <div className="my-16 font-bold">Movies:</div>
            <div className="grid sm:grid-cols-2 gap-16">
                {data.filter((item: MediaItemEntry): boolean => item.type === 'movie').map(renderRow)}
            </div>
        </Loading>
    );

    const renderList = (data: MediaItemEntry[]) => (
        <>
            <div className="flex justify-center gap-16 mb-24">
                <select
                    className="input text-12 pr-16"
                    onChange={(e: ChangeEvent<HTMLSelectElement>): void => e.target.blur()}
                    onBlur={handleSort}
                    defaultValue={sort}>
                    <option value="rating-desc">Rating (high-low)</option>
                    <option value="rating-asc">Rating (low-high)</option>
                    <option value="release-asc">Release (first-last)</option>
                    <option value="release-desc">Release (last-first)</option>
                    <option value="title-asc">Title (alphabetical)</option>
                    <option value="title-desc">Title (reverse)</option>
                    <option value="favourite">Favourite</option>
                </select>
                <input type="text" placeholder="Search" aria-label="Search" onKeyDown={handleKey} className="input" />
            </div>
            <Loading isLoading={loading} text="Loading media...">
                <div className="grid sm:grid-cols-2 gap-16">{data.map(renderRow)}</div>
                <Pagination
                    path={`/media/${type}/`}
                    postfix={formatQuery({ sort: sort !== 'rating-desc' ? sort : null, query })}
                    current={pagination.current}
                    total={pagination.total}
                />
            </Loading>
        </>
    );

    return (
        <Box title={type} className="min-h">
            {type === 'watchlist' ? renderWatchlist(media) : renderList(media)}
            {selected ? renderModal(selected) : null}
        </Box>
    );
};
