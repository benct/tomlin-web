import React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { DefaultState, MediaSearchItemEntry, ThunkDispatchFunc } from '../../interfaces';

import debounce from '../../util/debounce';
import { add, existing, getTmdbMedia, goToIMDb, remove, searchTmdbMedia } from '../../actions/media';
import paginationActions from '../../actions/pagination';

import Loading from '../page/Loading';
import Pagination from '../page/Pagination';
import MediaSearchItem from './MediaSearchItem';

interface MediaSearchStateProps {
    data: MediaSearchItemEntry[];
    existing: { movie: number[]; tv: number[] };
    type?: string;
    action?: string;
    id?: string;
    page?: number;
    loading: boolean;
}

interface MediaSearchDispatchProps {
    search: (query: string) => void;
    get: () => void;
    add: (type: string, id: number) => void;
    remove: (type: string, id: number) => void;
    goToIMDb: (type: string, id: number) => void;
    resetPagination: () => void;
    getExisting: () => void;
}

export interface MediaSearchRouteProps {
    type?: 'movie' | 'tv';
    action?: string;
    id?: string;
    page?: string;
}

class MediaSearch extends React.Component<MediaSearchStateProps & MediaSearchDispatchProps> {
    componentDidMount(): void {
        this.props.getExisting();

        if (this.props.action && this.props.type) {
            this.props.get();
            window.scrollTo(0, 0);
        }
    }

    componentDidUpdate(prevProps: MediaSearchStateProps & MediaSearchDispatchProps): void {
        if (
            this.props.action &&
            this.props.type &&
            (this.props.action !== prevProps.action || this.props.type !== prevProps.type || this.props.page !== prevProps.page)
        ) {
            this.props.get();
            window.scrollTo(0, 0);
        }
    }

    componentWillUnmount(): void {
        this.props.resetPagination();
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        if (event.target.value?.length > 1) {
            this.props.search(event.target.value);
        }
    }

    renderItem(data: MediaSearchItemEntry): React.ReactNode {
        const existing = this.props.existing[data.media_type ?? this.props.type] ?? [];
        return (
            <MediaSearchItem
                data={data}
                stored={existing.includes(data.id)}
                add={this.props.add.bind(this, data.media_type, data.id)}
                remove={this.props.remove.bind(this, data.media_type, data.id)}
                imdb={this.props.goToIMDb.bind(this, data.media_type, data.id)}
                key={`mediaResult${data.id}`}
            />
        );
    }

    render(): React.ReactElement {
        return (
            <div className="text-center">
                <input type="text" name="query" className="input mbl" aria-label="Search" onChange={this.handleChange.bind(this)} />
                <div className="media-search">
                    <Link to={'/media/search/movie/popular/'}>Popular (Movie)</Link>
                    <Link to={'/media/search/movie/top/'}>Top Rated (Movie)</Link>
                    <Link to={'/media/search/movie/now/'}>Now Playing (Movie)</Link>
                    <Link to={'/media/search/movie/upcoming/'}>Upcoming (Movie)</Link>
                </div>
                <div className="media-search mbl">
                    <Link to={'/media/search/tv/popular/'}>Popular (TV)</Link>
                    <Link to={'/media/search/tv/top/'}>Top Rated (TV)</Link>
                    <Link to={'/media/search/tv/now/'}>Now Playing (TV)</Link>
                </div>
                <Loading isLoading={this.props.loading} text="Loading media...">
                    {this.props.data.map(this.renderItem.bind(this))}
                    <Pagination path={`/media/search/${this.props.type}/${this.props.action}/`} postfix={this.props.id} />
                </Loading>
            </div>
        );
    }
}

const routeProps = useParams<MediaSearchRouteProps>(); // TODO TEMP DOES NOT WORK

const mapStateToProps = (state: DefaultState): MediaSearchStateProps => ({
    data: state.media.search,
    existing: state.media.existing,
    type: routeProps.type,
    action: routeProps.action,
    id: routeProps.id,
    page: Number(routeProps.page ?? 1),
    loading: state.loading,
});

const mapDispatchToProps = (dispatch: ThunkDispatchFunc): MediaSearchDispatchProps => ({
    search: debounce((query: string): Promise<void> => dispatch(searchTmdbMedia(query)), 500),
    get: (): Promise<void> => dispatch(getTmdbMedia({ ...routeProps, page: Number(routeProps.page ?? 1) })),
    add: (type: string, id: number): Promise<void> => dispatch(add({ type: type ?? routeProps.type, id })),
    remove: (type: string, id: number): Promise<void> => dispatch(remove({ type: type ?? routeProps.type, id })),
    goToIMDb: (type: string, id: number): Promise<void> => dispatch(goToIMDb({ type: type ?? routeProps.type, id })),
    resetPagination: (): Action => dispatch(paginationActions.reset()),
    getExisting: (): Promise<void> => dispatch(existing()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaSearch);
