import { ChangeEvent, FC, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { DefaultState, MediaSearchItemEntry, MediaState } from '../../interfaces';

import { debounce } from '../../util/debounce';
import { add, getExisting, getTmdbMedia, goToIMDb, remove, searchTmdbMedia } from '../../actions/media';
import paginationActions from '../../actions/pagination';

import { Loading } from '../page/Loading';
import { Pagination } from '../page/Pagination';
import { MediaSearchItem } from './MediaSearchItem';

interface MediaSearchState {
    data: MediaState['search'];
    existing: MediaState['existing'];
}

export const MediaSearch: FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [type, action, page, id] = (router.query.params ?? []) as string[];

    const loading = useSelector<DefaultState, DefaultState['loading']>((state) => state.loading);
    const { data, existing } = useSelector<DefaultState, MediaSearchState>((state) => ({
        data: state.media.search,
        existing: state.media.existing,
    }));

    useEffect(() => {
        dispatch(getExisting());

        return () => {
            dispatch(paginationActions.reset());
        };
    }, [dispatch]);

    useEffect(() => {
        if (action && type) {
            dispatch(getTmdbMedia({ type, action, page: Number(page ?? 1), id }));
            window.scrollTo(0, 0);
        }
    }, [dispatch, type, action, page, id]);

    const search = debounce((query: string) => dispatch(searchTmdbMedia(query)), 500);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.value?.length > 1) {
            search(event.target.value);
        }
    };

    const renderItem = (data: MediaSearchItemEntry): ReactNode => {
        const current = existing[data.media_type ?? type] ?? [];
        return (
            <MediaSearchItem
                data={data}
                stored={current.includes(data.id)}
                add={() => dispatch(add({ type: data.media_type ?? type, id: data.id }))}
                remove={() => dispatch(remove({ type: data.media_type ?? type, id: data.id }))}
                imdb={() => dispatch(goToIMDb({ type: data.media_type ?? type, id: data.id }))}
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
                {data.map(renderItem)}
                <Pagination path={`/media/search/${type}/${action}/`} postfix={id} />
            </Loading>
        </div>
    );
};
