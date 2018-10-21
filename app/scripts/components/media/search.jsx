import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import debounce from '../../util/debounce.js';
import mediaActions from '../../actions/media.js';
import paginationActions from '../../actions/pagination.js';

import SearchItem from './searchItem.jsx';
import Pagination from '../page/pagination.jsx';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.search = debounce(query => props.dispatch(mediaActions.search(query)), 500);
    }

    componentDidMount() {
        if (this.props.action && this.props.type) {
            this.getMedia();
        }
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.action &&
            this.props.type &&
            (this.props.action !== prevProps.action || this.props.type !== prevProps.type || this.props.page !== prevProps.page)
        ) {
            this.getMedia();
        }
    }

    componentWillUnmount() {
        this.props.dispatch(mediaActions.clear());
        this.props.dispatch(paginationActions.reset());
    }

    getMedia() {
        this.props.dispatch(mediaActions.post({ action: this.props.action, type: this.props.type, page: this.props.page }));
        window.scrollTo(0, 0);
    }

    handleChange(event) {
        if (event.target.value && event.target.value.length > 1) {
            this.search(event.target.value);
        }
    }

    renderItem(data, idx) {
        return (
            <SearchItem
                title={data.title ? data.title : data.name}
                originalTitle={data.original_title ? data.original_title : data.original_name}
                poster={data.poster_path}
                release={data.release_date || data.first_air_date}
                language={data.original_language}
                rating={data.vote_average}
                votes={data.vote_count || 0}
                overview={data.overview}
                stored={this.props.existing.includes(data.id)}
                add={() => this.props.dispatch(mediaActions.add({ type: data.media_type || this.props.type, id: data.id }))}
                remove={() => this.props.dispatch(mediaActions.remove({ type: data.media_type || this.props.type, id: data.id }))}
                imdb={() => this.props.dispatch(mediaActions.goToIMDb({ type: data.media_type || this.props.type, id: data.id }))}
                key={`mediaResult${idx}`}
            />
        );
    }

    render() {
        return (
            <div className="text-center">
                <input
                    type="text"
                    name="query"
                    className="mbl"
                    onChange={this.handleChange.bind(this)}
                    onClick={event => event.target.select()}
                />
                <div className="media-search">
                    <Link to={'/media/admin/movie/popular/'}>Popular (Movie)</Link>
                    <Link to={'/media/admin/movie/top/'}>Top Rated (Movie)</Link>
                    <Link to={'/media/admin/movie/now/'}>Now Playing (Movie)</Link>
                    <Link to={'/media/admin/movie/upcoming/'}>Upcoming (Movie)</Link>
                </div>
                <div className="media-search mbm">
                    <Link to={'/media/admin/tv/popular/'}>Popular (TV)</Link>
                    <Link to={'/media/admin/tv/top/'}>Top Rated (TV)</Link>
                    <Link to={'/media/admin/tv/now/'}>Now Playing (TV)</Link>
                    <div className="faded" onClick={() => this.props.dispatch(mediaActions.updatePosters())}>
                        Update Posters (!)
                    </div>
                </div>
                {this.props.data.map(this.renderItem.bind(this))}
                <Pagination path={`/media/admin/${this.props.type}/${this.props.action}/`} />
            </div>
        );
    }
}

Search.propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    existing: PropTypes.array.isRequired,
    type: PropTypes.string,
    action: PropTypes.string,
    page: PropTypes.number,
};

export default connect((state, ownProps) => ({
    data: state.media.search,
    existing: state.media.existing,
    type: ownProps.match.params.type,
    action: ownProps.match.params.action,
    page: +ownProps.match.params.page || 1,
}))(Search);
