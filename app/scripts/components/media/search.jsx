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
    componentDidMount() {
        if (this.props.action && this.props.type) {
            this.props.get();
            window.scrollTo(0, 0);
        }
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.action &&
            this.props.type &&
            (this.props.action !== prevProps.action || this.props.type !== prevProps.type || this.props.page !== prevProps.page)
        ) {
            this.props.get();
            window.scrollTo(0, 0);
        }
    }

    componentWillUnmount() {
        this.props.resetPagination();
    }

    handleChange(event) {
        if (event.target.value && event.target.value.length > 1) {
            this.props.search(event.target.value);
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
                add={this.props.add.bind(this, data.media_type, data.id)}
                remove={this.props.remove.bind(this, data.media_type, data.id)}
                imdb={this.props.goToIMDb.bind(this, data.media_type, data.id)}
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
                    aria-label="Search"
                    onChange={this.handleChange.bind(this)}
                    onClick={event => event.target.select()}
                />
                <div className="media-search">
                    <Link to={'/media/search/movie/popular/'}>Popular (Movie)</Link>
                    <Link to={'/media/search/movie/top/'}>Top Rated (Movie)</Link>
                    <Link to={'/media/search/movie/now/'}>Now Playing (Movie)</Link>
                    <Link to={'/media/search/movie/upcoming/'}>Upcoming (Movie)</Link>
                </div>
                <div className="media-search mbm">
                    <Link to={'/media/search/tv/popular/'}>Popular (TV)</Link>
                    <Link to={'/media/search/tv/top/'}>Top Rated (TV)</Link>
                    <Link to={'/media/search/tv/now/'}>Now Playing (TV)</Link>
                </div>
                {this.props.data.map(this.renderItem.bind(this))}
                <Pagination path={`/media/search/${this.props.type}/${this.props.action}/`} postfix={`/${this.props.id}`} />
            </div>
        );
    }
}

Search.propTypes = {
    data: PropTypes.array.isRequired,
    existing: PropTypes.array.isRequired,
    type: PropTypes.string,
    action: PropTypes.string,
    id: PropTypes.string,
    page: PropTypes.number,

    search: PropTypes.func.isRequired,
    get: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    goToIMDb: PropTypes.func.isRequired,
    resetPagination: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    data: state.media.search,
    existing: state.media.existing,
    type: ownProps.match.params.type,
    action: ownProps.match.params.action,
    id: ownProps.match.params.id,
    page: +ownProps.match.params.page || 1,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    search: debounce(query => dispatch(mediaActions.search(query)), 500),
    get: () => dispatch(mediaActions.post(Object.assign({}, ownProps.match.params, { page: +ownProps.match.params.page || 1 }))),
    add: (type, id) => dispatch(mediaActions.add({ type: type || ownProps.match.params.type, id })),
    remove: (type, id) => dispatch(mediaActions.remove({ type: type || ownProps.match.params.type, id })),
    goToIMDb: (type, id) => dispatch(mediaActions.goToIMDb({ type: type || ownProps.match.params.type, id })),
    resetPagination: () => dispatch(paginationActions.reset()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);
