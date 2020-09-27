import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { DefaultState, MediaItemEntry, MediaType } from '../../interfaces';

import mediaActions, { favourite, getMedia, remove, seen, setItem, update } from '../../actions/media';
import paginationActions from '../../actions/pagination';

import Loading from '../page/Loading';
import Pagination from '../page/Pagination';
import MediaModal from './MediaModal';
import MediaItem from './MediaItem';

interface MediaListState {
    data: MediaItemEntry[];
    item: MediaItemEntry | null;
    showModal: boolean;
    sort: string;
    loading: boolean;
}

interface MediaListRouteProps {
    type: MediaType;
    page?: string;
}

const MediaList: React.FC = () => {
    const dispatch = useDispatch();
    const routeProps = useParams<MediaListRouteProps>();
    const props = useSelector<DefaultState, MediaListState>((state) => ({
        ...state.media,
        data: state.media[routeProps.type]?.results ?? [],
        loading: state.loading,
    }));

    const loadMedia = (query?: string): void => {
        dispatch(getMedia({ type: routeProps.type, query, page: Number(routeProps.page ?? 1) }));
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        if (props.data.length) {
            dispatch(paginationActions.set(Number(routeProps.page ?? 1)));
        }

        return () => {
            dispatch(paginationActions.reset());
        };
    }, []);

    useEffect(() => {
        loadMedia();
    }, [routeProps.type, routeProps.page]);

    const handleKey = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if ((event.keyCode === 13 || event.key === 'Enter') && event.target) {
            const target = event.target as HTMLInputElement;
            loadMedia(target.value.length ? target.value : undefined);
        }
    };

    const handleSort = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        if (props.sort !== event.target.value) {
            dispatch(mediaActions.setSort(event.target.value));
            dispatch(
                getMedia({
                    type: routeProps.type,
                    sort: event.target.value,
                    page: Number(routeProps.page ?? 1),
                })
            );
        }
    };

    const renderRow = (item: MediaItemEntry): React.ReactElement => (
        <MediaItem
            key={`mediaItem${item.id}`}
            data={item}
            type={item.type ?? routeProps.type}
            showItem={() => dispatch(setItem({ type: item.type ?? routeProps.type, id: item.id }))}
            setSeen={() => dispatch(seen({ action: routeProps.type, type: item.type ?? routeProps.type, id: item.id, set: !item.seen }))}
            setFavourite={() =>
                dispatch(favourite({ action: routeProps.type, type: item.type ?? routeProps.type, id: item.id, set: !item.favourite }))
            }
        />
    );

    const renderModal = (item: MediaItemEntry): React.ReactElement => (
        <MediaModal
            data={item}
            type={item.type ?? routeProps.type}
            close={() => dispatch(mediaActions.hideModal())}
            update={() => dispatch(update({ action: routeProps.type, type: item.type ?? routeProps.type, id: item.id }))}
            remove={() => dispatch(remove({ action: routeProps.type, type: item.type ?? routeProps.type, id: item.id }))}
            setSeen={() => dispatch(seen({ action: routeProps.type, type: item.type ?? routeProps.type, id: item.id, set: !item.seen }))}
            setFavourite={() =>
                dispatch(favourite({ action: routeProps.type, type: item.type ?? routeProps.type, id: item.id, set: !item.favourite }))
            }
        />
    );

    const renderWatchlist = (data: MediaItemEntry[]): React.ReactElement => (
        <Loading isLoading={props.loading} text="Loading media...">
            <div>TV-Shows:</div>
            <div className="clear-fix text-center">{data.filter((item: MediaItemEntry): boolean => item.type === 'tv').map(renderRow)}</div>
            <div>Movies:</div>
            <div className="clear-fix text-center">
                {data.filter((item: MediaItemEntry): boolean => item.type === 'movie').map(renderRow)}
            </div>
        </Loading>
    );

    const renderList = (data: MediaItemEntry[]): React.ReactElement => (
        <>
            <div className="text-center mbl">
                <select
                    className="input input-small media-input mrs"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => e.target.blur()}
                    onBlur={handleSort}
                    defaultValue={props.sort}>
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
            <Loading isLoading={props.loading} text="Loading media...">
                <div className="clear-fix text-center">{data.map(renderRow)}</div>
                <Pagination path={`/media/${routeProps.type}/`} />
            </Loading>
        </>
    );

    return (
        <>
            {routeProps.type === 'watchlist' ? renderWatchlist(props.data) : renderList(props.data)}
            {props.showModal && props.item ? renderModal(props.item) : null}
        </>
    );
};

export default MediaList;
