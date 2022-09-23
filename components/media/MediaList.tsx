import { ChangeEvent, FC, KeyboardEvent, ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DefaultState, MediaItemEntry, MediaType } from '../../interfaces';

import mediaActions, { favourite, getMedia, remove, seen, setItem, update } from '../../actions/media';
import paginationActions from '../../actions/pagination';

import { Loading } from '../page/Loading';
import { Pagination } from '../page/Pagination';
import { MediaModal } from './MediaModal';
import { MediaItem } from './MediaItem';

interface MediaListState {
    data: MediaItemEntry[];
    item: MediaItemEntry | null;
    showModal: boolean;
    sort: string;
    loading: boolean;
}

interface MediaListProps {
    type: MediaType;
    page: number;
}

export const MediaList: FC<MediaListProps> = ({ type, page }) => {
    const dispatch = useDispatch();

    const props = useSelector<DefaultState, MediaListState>((state) => ({
        ...state.media,
        data: state.media[type]?.results ?? [],
        loading: state.loading,
    }));

    const loadMedia = (query?: string): void => {
        dispatch(getMedia({ type, query, page: query ? 1 : page }));
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        // if (props.data.length) {
        //     dispatch(paginationActions.set(Number(page ?? 1)));
        // }

        return () => {
            dispatch(paginationActions.reset());
        };
    }, [dispatch]);

    useEffect(() => {
        loadMedia();
    }, [type, page]);

    const handleKey = (event: KeyboardEvent<HTMLInputElement>): void => {
        if ((event.keyCode === 13 || event.key === 'Enter') && event.target) {
            const target = event.target as HTMLInputElement;
            loadMedia(target.value.length ? target.value : undefined);
        }
    };

    const handleSort = (event: ChangeEvent<HTMLSelectElement>): void => {
        if (props.sort !== event.target.value) {
            dispatch(mediaActions.setSort(event.target.value));
            dispatch(getMedia({ type, page, sort: event.target.value }));
        }
    };

    const renderRow = (item: MediaItemEntry): ReactElement => (
        <MediaItem
            key={`mediaItem${item.id}`}
            data={item}
            type={item.type ?? type}
            showItem={() => dispatch(setItem({ type: item.type ?? type, id: item.id }))}
            setSeen={() => dispatch(seen({ action: type, type: item.type ?? type, id: item.id, set: !item.seen }))}
            setFavourite={() => dispatch(favourite({ action: type, type: item.type ?? type, id: item.id, set: !item.favourite }))}
        />
    );

    const renderModal = (item: MediaItemEntry): ReactElement => (
        <MediaModal
            data={item}
            type={item.type ?? type}
            close={() => dispatch(mediaActions.hideModal())}
            update={() => dispatch(update({ action: type, type: item.type ?? type, id: item.id }))}
            remove={() => dispatch(remove({ action: type, type: item.type ?? type, id: item.id }))}
            setSeen={() => dispatch(seen({ action: type, type: item.type ?? type, id: item.id, set: !item.seen }))}
            setFavourite={() => dispatch(favourite({ action: type, type: item.type ?? type, id: item.id, set: !item.favourite }))}
        />
    );

    const renderWatchlist = (data: MediaItemEntry[]): ReactElement => (
        <Loading isLoading={props.loading} text="Loading media...">
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
                <Pagination path={`/media/${type}/`} />
            </Loading>
        </>
    );

    return (
        <div className="wrapper min-height ptm">
            {type === 'watchlist' ? renderWatchlist(props.data) : renderList(props.data)}
            {props.showModal && props.item ? renderModal(props.item) : null}
        </div>
    );
};
