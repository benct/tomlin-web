import React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { useParams } from 'react-router';

import { DefaultState, MediaItemEntry, MediaType, ThunkDispatchFunc } from '../../interfaces';

import mediaActions, { favourite, getMedia, remove, seen, setItem, update } from '../../actions/media';
import paginationActions from '../../actions/pagination';

import Loading from '../page/Loading';
import Pagination from '../page/Pagination';
import MediaModal from './MediaModal';
import MediaItem from './MediaItem';

interface MediaListStateProps {
    data: MediaItemEntry[];
    item: MediaItemEntry | null;
    showModal: boolean;
    sort: string;
    type: MediaType;
    page: number;
    loading: boolean;
}

interface MediaListDispatchProps {
    loadMedia: (query?: string) => void;
    setSort: (sort: string) => void;
    setPagination: (page: number) => void;
    resetPagination: () => void;
    show: (itemType: string, id: number) => void;
    hide: () => void;
    update: (itemType: string, id: number) => void;
    remove: (itemType: string, id: number) => void;
    setSeen: (itemType: string, id: number, seen: boolean) => void;
    setFavourite: (itemType: string, id: number, favourite: boolean) => void;
}

interface MediaListRouteProps {
    type: MediaType;
    page?: string;
}

class MediaList extends React.Component<MediaListStateProps & MediaListDispatchProps> {
    componentDidMount(): void {
        if (this.props.data.length) {
            this.props.setPagination(this.props.page);
        } else {
            this.props.loadMedia();
        }
    }

    componentDidUpdate(prevProps: MediaListStateProps): void {
        if (this.props.type !== prevProps.type || this.props.page !== prevProps.page) {
            this.props.loadMedia();
        }
    }

    componentWillUnmount(): void {
        this.props.resetPagination();
    }

    handleKey(event: React.KeyboardEvent<HTMLInputElement>): void {
        if ((event.keyCode === 13 || event.key === 'Enter') && event.target) {
            const target = event.target as HTMLInputElement;
            this.props.loadMedia(target.value.length ? target.value : undefined);
        }
    }

    handleSort(event: React.ChangeEvent<HTMLSelectElement>): void {
        if (this.props.sort !== event.target.value) {
            this.props.setSort(event.target.value);
        }
    }

    renderRow(item: MediaItemEntry): React.ReactElement {
        return (
            <MediaItem
                key={`mediaItem${item.id}`}
                type={item.type ?? this.props.type}
                data={item}
                setSeen={this.props.setSeen.bind(this, item.type, item.id, item.seen)}
                setFavourite={this.props.setFavourite.bind(this, item.type, item.id, item.favourite)}
                showItem={this.props.show.bind(this, item.type, item.id)}
            />
        );
    }

    renderModal(item: MediaItemEntry): React.ReactElement {
        return (
            <MediaModal
                type={item.type ?? this.props.type}
                data={item}
                close={this.props.hide}
                update={this.props.update.bind(this, item.type, item.id)}
                remove={this.props.remove.bind(this, item.type, item.id)}
                setSeen={this.props.setSeen.bind(this, item.type, item.id, item.seen)}
                setFavourite={this.props.setFavourite.bind(this, item.type, item.id, item.favourite)}
            />
        );
    }

    renderWatchlist(data: MediaItemEntry[]): React.ReactElement {
        return (
            <Loading isLoading={this.props.loading} text="Loading media...">
                <div>TV-Shows:</div>
                <div className="clear-fix text-center">
                    {data.filter((item: MediaItemEntry): boolean => item.type === 'tv').map(this.renderRow.bind(this))}
                </div>
                <div>Movies:</div>
                <div className="clear-fix text-center">
                    {data.filter((item: MediaItemEntry): boolean => item.type === 'movie').map(this.renderRow.bind(this))}
                </div>
            </Loading>
        );
    }

    renderList(data: MediaItemEntry[]): React.ReactElement {
        return (
            <>
                <div className="text-center mbl">
                    <select
                        className="input input-small media-input mrs"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => e.target.blur()}
                        onBlur={this.handleSort.bind(this)}
                        defaultValue={this.props.sort}>
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
                        onKeyPress={this.handleKey.bind(this)}
                    />
                </div>
                <Loading isLoading={this.props.loading} text="Loading media...">
                    <div className="clear-fix text-center">{data.map(this.renderRow.bind(this))}</div>
                    <Pagination path={`/media/${this.props.type}/`} />
                </Loading>
            </>
        );
    }

    render(): React.ReactElement {
        return (
            <>
                {this.props.type === 'watchlist' ? this.renderWatchlist(this.props.data) : this.renderList(this.props.data)}
                {this.props.showModal && this.props.item ? this.renderModal(this.props.item) : null}
            </>
        );
    }
}

const mapStateToProps = (state: DefaultState): MediaListStateProps => {
    const { type, page } = useParams<MediaListRouteProps>(); // TODO DOES NOT WORK
    return {
        data: state.media[type]?.results ?? [],
        item: state.media.item,
        showModal: state.media.showModal,
        sort: state.media.sort,
        type: type,
        page: Number(page ?? 1),
        loading: state.loading,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatchFunc): MediaListDispatchProps => {
    const { type, page } = useParams<MediaListRouteProps>(); // TODO TEMP DOES NOT WORK

    return {
        loadMedia: (query?: string): void => {
            dispatch(getMedia({ type, query, page: Number(page ?? 1) }));
            window.scrollTo(0, 0);
        },
        setSort: (sort: string): void => {
            dispatch(mediaActions.setSort(sort));
            dispatch(getMedia({ type, sort, page: Number(page ?? 1) }));
        },
        setPagination: (page: number): Action => dispatch(paginationActions.set(page)),
        resetPagination: (): Action => dispatch(paginationActions.reset()),
        show: (itemType: string, id: number): Promise<void> => dispatch(setItem({ type: itemType ?? type, id })),
        hide: (): Action => dispatch(mediaActions.hideModal()),
        update: (itemType: string, id: number): Promise<void> => dispatch(update({ action: type, type: itemType ?? type, id })),
        remove: (itemType: string, id: number): Promise<void> => dispatch(remove({ action: type, type: itemType ?? type, id })),
        setSeen: (itemType: string, id: number, isSeen: boolean): Promise<void> =>
            dispatch(seen({ action: type, type: itemType ?? type, id, set: !isSeen })),
        setFavourite: (itemType: string, id: number, isFavourite: boolean): Promise<void> =>
            dispatch(favourite({ action: type, type: itemType ?? type, id, set: !isFavourite })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaList);
