import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { DefaultState, MediaSearchItemEntry } from '../../interfaces';

import debounce from '../../util/debounce';
import { add, existing, getTmdbMedia, goToIMDb, remove, searchTmdbMedia } from '../../actions/media';
import paginationActions from '../../actions/pagination';

import Loading from '../page/Loading';
import Pagination from '../page/Pagination';
import MediaSearchItem from './MediaSearchItem';

interface MediaSearchProps {
    data: MediaSearchItemEntry[];
    existing: { movie: number[]; tv: number[] };
    loading: boolean;
}

export interface MediaSearchRouteProps {
    type?: 'movie' | 'tv';
    action?: string;
    id?: string;
    page?: string;
}

const MediaSearch: React.FC = () => {
    const dispatch = useDispatch();
    const routeProps = useParams<MediaSearchRouteProps>();
    const props = useSelector<DefaultState, MediaSearchProps>((state) => ({
        data: state.media.search,
        existing: state.media.existing,
        loading: state.loading,
    }));

    const search = debounce((query: string) => dispatch(searchTmdbMedia(query)), 500);

    const getMedia = () => {
        if (routeProps.action && routeProps.type) {
            dispatch(getTmdbMedia({ ...routeProps, page: Number(routeProps.page ?? 1) }));
            window.scrollTo(0, 0);
        }
    };

    React.useEffect(() => {
        dispatch(existing());

        getMedia();

        return () => {
            dispatch(paginationActions.reset());
        };
    }, []);

    React.useEffect(() => {
        getMedia();
    }, [routeProps.action, routeProps.type, routeProps.page]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.value?.length > 1) {
            search(event.target.value);
        }
    };

    const renderItem = (data: MediaSearchItemEntry): React.ReactNode => {
        const existing = props.existing[data.media_type ?? routeProps.type] ?? [];
        return (
            <MediaSearchItem
                data={data}
                stored={existing.includes(data.id)}
                add={() => dispatch(add({ type: data.media_type ?? routeProps.type, id: data.id }))}
                remove={() => dispatch(remove({ type: data.media_type ?? routeProps.type, id: data.id }))}
                imdb={() => dispatch(goToIMDb({ type: data.media_type ?? routeProps.type, id: data.id }))}
                key={`mediaResult${data.id}`}
            />
        );
    };

    return (
        <div className="text-center">
            <input type="text" name="query" className="input mbl" aria-label="Search" onChange={handleChange} />
            <div className="media-search">
                <Link to="/media/search/movie/popular/">Popular (Movie)</Link>
                <Link to="/media/search/movie/top/">Top Rated (Movie)</Link>
                <Link to="/media/search/movie/now/">Now Playing (Movie)</Link>
                <Link to="/media/search/movie/upcoming/">Upcoming (Movie)</Link>
            </div>
            <div className="media-search mbl">
                <Link to="/media/search/tv/popular/">Popular (TV)</Link>
                <Link to="/media/search/tv/top/">Top Rated (TV)</Link>
                <Link to="/media/search/tv/now/">Now Playing (TV)</Link>
            </div>
            <Loading isLoading={props.loading} text="Loading media...">
                {props.data.map(renderItem)}
                <Pagination path={`/media/search/${routeProps.type}/${routeProps.action}/`} postfix={routeProps.id} />
            </Loading>
        </div>
    );
};

export default MediaSearch;
