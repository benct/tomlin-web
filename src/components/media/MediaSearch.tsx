import { ChangeEvent } from 'react';
import Link from 'next/link';

import { debounce } from '@/util/debounce';
import { useMediaSearch } from '@/data/media';

import { MediaSearchItemEntry, MediaSearchProps } from '@/interfaces';
import { Pagination } from '@/components/page/Pagination';
import { Loading } from '@/components/page/Loading';
import { Box } from '@/components/page/Box';
import { MediaSearchItem } from './MediaSearchItem';

export const MediaSearch = ({ type, action, page, id }: MediaSearchProps) => {
    const { media, pagination, loading, search } = useMediaSearch({ type, action, page, id });

    const searchMedia = debounce((query: string) => search(query), 500);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        searchMedia(event.target.value);
    };

    return (
        <Box title="Search" className="min-h">
            <input type="text" placeholder="Movie or TV show" aria-label="Search" onChange={handleChange} className="input mx-auto" />
            <div className="flex justify-center gap-16 text-14 my-16">
                <Link href="/media/search/movie/popular/">Popular (Movie)</Link>
                <Link href="/media/search/movie/top/">Top Rated (Movie)</Link>
                <Link href="/media/search/movie/now/">Now Playing (Movie)</Link>
                <Link href="/media/search/movie/upcoming/">Upcoming (Movie)</Link>
            </div>
            <div className="flex justify-center gap-16 text-14 my-16">
                <Link href="/media/search/tv/popular/">Popular (TV)</Link>
                <Link href="/media/search/tv/top/">Top Rated (TV)</Link>
                <Link href="/media/search/tv/now/">Now Playing (TV)</Link>
            </div>
            <Loading isLoading={loading} text="Loading media...">
                <div className="space-y-16 mt-24">
                    {media.map((data: MediaSearchItemEntry) => (
                        <MediaSearchItem data={data} type={data.media_type ?? type} key={`mediaResult${data.id}`} />
                    ))}
                </div>
                <Pagination path={`/media/search/${type}/${action}/`} postfix={id} current={pagination.current} total={pagination.total} />
            </Loading>
        </Box>
    );
};
