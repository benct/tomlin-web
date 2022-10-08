import { ChangeEvent, FC, ReactNode } from 'react';
import Link from 'next/link';

import { debounce } from '../../util/debounce';
import { useExisting, useMediaSearch } from '../../data/media';

import { Loading } from '../page/Loading';
import { Pagination } from '../page/Pagination';
import { MediaSearchItem } from './MediaSearchItem';
import { MediaSearchItemEntry, MediaSearchProps } from '../../interfaces';

export const MediaSearch: FC<MediaSearchProps> = ({ type, action, page, id }) => {
    const existing = useExisting();
    const { media, pagination, loading, search, add, remove, imdb } = useMediaSearch({ type, action, page, id });

    const searchMedia = debounce((query: string) => search(query), 500);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        searchMedia(event.target.value);
    };

    const renderItem = (data: MediaSearchItemEntry): ReactNode => {
        const current = existing[data.media_type ?? type] ?? [];
        return (
            <MediaSearchItem
                data={data}
                stored={current.includes(data.id)}
                add={() => add(data.media_type ?? type, data.id)}
                remove={() => remove(data.media_type ?? type, data.id)}
                imdb={() => imdb(data.media_type ?? type, data.id)}
                key={`mediaResult${data.id}`}
            />
        );
    };

    return (
        <div className="wrapper min-height ptm text-center">
            <input type="text" name="query" className="input mbl" aria-label="Search" onChange={handleChange} />
            <div className="media-search">
                <Link href="/media/search/movie/popular/">Popular (Movie)</Link>
                <Link href="/media/search/movie/top/">Top Rated (Movie)</Link>
                <Link href="/media/search/movie/now/">Now Playing (Movie)</Link>
                <Link href="/media/search/movie/upcoming/">Upcoming (Movie)</Link>
            </div>
            <div className="media-search mbl">
                <Link href="/media/search/tv/popular/">Popular (TV)</Link>
                <Link href="/media/search/tv/top/">Top Rated (TV)</Link>
                <Link href="/media/search/tv/now/">Now Playing (TV)</Link>
            </div>
            <Loading isLoading={loading} text="Loading media...">
                {media.map(renderItem)}
                <Pagination path={`/media/search/${type}/${action}/`} postfix={id} current={pagination.current} total={pagination.total} />
            </Loading>
        </div>
    );
};
