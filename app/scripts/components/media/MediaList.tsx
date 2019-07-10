import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';

import mediaActions from '../../actions/media';
import paginationActions from '../../actions/pagination';
import { DefaultState, MediaItemEntry, MediaResults, MediaType } from '../../interfaces';

import Pagination from '../page/Pagination';
import MediaModal from './MediaModal';
import MediaItem from './MediaItem';

interface MediaListStateProps {
    data: MediaResults | null;
    item: MediaItemEntry | null;
    showModal: boolean;
    sort: string;
    type: MediaType;
    page: number;
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
        if (this.props.data) {
            this.props.setPagination(this.props.data.page);
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
                key={`${item.id}-${item.imdb_id}`}
                type={item.type || this.props.type}
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
                type={item.type || this.props.type}
                data={item}
                close={this.props.hide}
                update={this.props.update.bind(this, item.type, item.id)}
                remove={this.props.remove.bind(this, item.type, item.id)}
                setSeen={this.props.setSeen.bind(this, item.type, item.id, item.seen)}
                setFavourite={this.props.setFavourite.bind(this, item.type, item.id, item.favourite)}
            />
        );
    }

    renderWatchlist(data: MediaResults): React.ReactElement {
        return (
            <>
                <div>TV-Shows:</div>
                <div className="clear-fix text-center">
                    {data.results.filter((item: MediaItemEntry): boolean => item.type === 'tv').map(this.renderRow.bind(this))}
                </div>
                <div>Movies:</div>
                <div className="clear-fix text-center">
                    {data.results.filter((item: MediaItemEntry): boolean => item.type === 'movie').map(this.renderRow.bind(this))}
                </div>
            </>
        );
    }

    renderList(data: MediaResults): React.ReactElement {
        return (
            <>
                <div className="text-center mbl">
                    <select
                        className="input input-small media-input color-light mrs"
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
                <div className="clear-fix text-center">{data.results.map(this.renderRow.bind(this))}</div>
                <Pagination path={`/media/${this.props.type}/`} />
            </>
        );
    }

    render(): React.ReactNode {
        return this.props.data ? (
            <>
                {this.props.type === 'watchlist' ? this.renderWatchlist(this.props.data) : this.renderList(this.props.data)}
                {this.props.showModal && this.props.item ? this.renderModal(this.props.item) : null}
            </>
        ) : null;
    }
}

const mapStateToProps = (state: DefaultState, ownProps: RouteComponentProps<MediaListRouteProps>): MediaListStateProps => ({
    data: state.media[ownProps.match.params.type],
    item: state.media.item,
    showModal: state.media.showModal,
    sort: state.media.sort,
    type: ownProps.match.params.type,
    page: Number(ownProps.match.params.page || 1),
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: RouteComponentProps<MediaListRouteProps>): MediaListDispatchProps => {
    const { type, page } = ownProps.match.params;
    return {
        loadMedia: (query?: string): void => {
            dispatch(mediaActions.get({ action: type, query, page: page || 1 }));
            window.scrollTo(0, 0);
        },
        setSort: (sort: string): void => {
            dispatch(mediaActions.setSort(sort));
            dispatch(mediaActions.get({ action: type, sort, page: page || 1 }));
        },
        setPagination: (page: number): void => dispatch(paginationActions.set(page)),
        resetPagination: (): void => dispatch(paginationActions.reset()),
        show: (itemType: string, id: number): void => dispatch(mediaActions.setItem({ type: itemType || type, id })),
        hide: (): void => dispatch(mediaActions.hideModal()),
        update: (itemType: string, id: number): void => dispatch(mediaActions.update({ action: type, type: itemType || type, id })),
        remove: (itemType: string, id: number): void => dispatch(mediaActions.remove({ action: type, type: itemType || type, id })),
        setSeen: (itemType: string, id: number, seen: boolean): void =>
            dispatch(mediaActions.seen({ action: type, type: itemType || type, id, set: !seen })),
        setFavourite: (itemType: string, id: number, favourite: boolean): void =>
            dispatch(mediaActions.favourite({ action: type, type: itemType || type, id, set: !favourite })),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MediaList);
