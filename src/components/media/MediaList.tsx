import { ChangeEvent, FC, KeyboardEvent, ReactElement } from 'react';
import { useRouter } from 'next/router';

import { formatQuery } from '@/util/formatting';
import { useMediaList } from '@/data/media';

import { MediaItemEntry, MediaProps } from '@/interfaces';
import { Loading } from '@/components/page/Loading';
import { Pagination } from '@/components/page/Pagination';
import { MediaModal } from './MediaModal';
import { MediaItem } from './MediaItem';

export const MediaList: FC<MediaProps> = ({ type, page, sort, query }) => {
    const router = useRouter();
    const { media, pagination, loading, selected, selectItem, update, remove, favourite, seen, seenEpisode, seenEpisodes } = useMediaList({
        type,
        page,
        sort,
        query,
    });

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

    const renderRow = (item: MediaItemEntry): ReactElement => (
        <MediaItem
            key={`mediaItem${item.id}`}
            data={item}
            type={item.type ?? type}
            showItem={() => selectItem(item.type ?? type, item.id)}
            setSeen={() => seen(item.type ?? type, item.id, !item.seen)}
            setFavourite={() => favourite(item.type ?? type, item.id, !item.favourite)}
        />
    );

    const renderModal = (item: MediaItemEntry): ReactElement => (
        <MediaModal
            data={item}
            type={item.type ?? type}
            close={() => selectItem()}
            update={() => update(item.type ?? type, item.id)}
            remove={() => remove(item.type ?? type, item.id)}
            setSeen={() => seen(item.type ?? type, item.id, !item.seen)}
            setFavourite={() => favourite(item.type ?? type, item.id, !item.favourite)}
            setSeenEpisode={(episodeId: number, set: boolean) => seenEpisode(item.type ?? type, item.id, episodeId, set)}
            setSeenEpisodes={(seasonId: number) => seenEpisodes(item.type ?? type, item.id, seasonId)}
        />
    );

    const renderWatchlist = (data: MediaItemEntry[]): ReactElement => (
        <Loading isLoading={loading} text="Loading media...">
            <div>TV-Shows:</div>
            <div className="clear-fix text-center">{data.filter((item: MediaItemEntry): boolean => item.type === 'tv').map(renderRow)}</div>
            <div>Movies:</div>
            <div className="clear-fix text-center">
                {data.filter((item: MediaItemEntry): boolean => item.type === 'movie').map(renderRow)}
            </div>
        </Loading>
    );

    const renderList = (data: MediaItemEntry[]): ReactElement => (
        <>
            <div className="text-center mbl">
                <select
                    className="input input-small media-input mrs"
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
                <input
                    className="input input-small media-input mls"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    onKeyPress={handleKey}
                />
            </div>
            <Loading isLoading={loading} text="Loading media...">
                <div className="clear-fix text-center">{data.map(renderRow)}</div>
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
        <div className="wrapper min-height ptm">
            {type === 'watchlist' ? renderWatchlist(media) : renderList(media)}
            {selected ? renderModal(selected) : null}
        </div>
    );
};
