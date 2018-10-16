import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { post } from '../../util/api.js';
import debounce from '../../util/debounce.js';

import SearchItem from './searchItem.jsx';
import Pagination from '../page/pagination.jsx';

export default class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            existing: [],
            showPagination: false,
        };

        this.search = debounce(this.search.bind(this), 500);
    }

    componentDidMount() {
        if (this.props.match.params.type && this.props.match.params.action) {
            this.getMedia();
        }
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.match.params.type &&
            this.props.match.params.action &&
            (this.props.match.params.type !== prevProps.match.params.type ||
                this.props.match.params.action !== prevProps.match.params.action ||
                this.props.match.params.page !== prevProps.match.params.page)
        ) {
            this.getMedia();
        }
    }

    static filterResults(data) {
        return data && data.length ? data.filter(result => result.media_type === 'movie' || result.media_type === 'tv') : [];
    }

    getMedia() {
        post({
            service: 'media',
            action: this.props.match.params.action,
            type: this.props.match.params.type,
            page: +this.props.match.params.page || 1,
        })
            .then(response => {
                window.scrollTo(0, 0);
                this.setState({ data: response.results, existing: response.existing, showPagination: true });
            })
            .catch(() => this.props.showToast('Failed to fetch media...'));
    }

    search(query) {
        post({ service: 'media', action: 'search', query: encodeURI(query) })
            .then(response => this.setState({ data: Search.filterResults(response.results), showPagination: false }))
            .catch(() => this.props.showToast('Failed to execute search...'));
    }

    save(type, id) {
        post({ service: 'media', action: 'save', type: type ? type : this.props.match.params.type, id })
            .then(() => {
                this.getMedia();
                this.props.showToast('Media successfully added!');
            })
            .catch(() => this.props.showToast('Failed to add media...'));
    }

    delete(type, id) {
        post({ service: 'media', action: 'delete', type: type ? type : this.props.match.params.type, id })
            .then(() => {
                this.getMedia();
                this.props.showToast('Media successfully removed!');
            })
            .catch(() => this.props.showToast('Failed to remove media...'));
    }

    goToIMDb(type, id) {
        post({ service: 'media', action: 'external', type: type ? type : this.props.match.params.type, id })
            .then(response => window.open(`https://www.imdb.com/title/${response}`, '_blank').focus())
            .catch(() => this.props.showToast('Failed to get external ID...'));
    }

    updatePosters() {
        post({ service: 'media', action: 'images', overwrite: false })
            .then(response => this.props.showToast(`Successfully updated ${response} posters!`))
            .catch(() => this.props.showToast('Failed to update posters...'));
    }

    handleChange(event) {
        if (event.target.value && event.target.value.length > 1) {
            this.search(event.target.value);
        } else {
            this.setState({ data: [] });
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
                stored={this.state.existing.includes(data.id)}
                add={this.save.bind(this, data.media_type, data.id)}
                remove={this.delete.bind(this, data.media_type, data.id)}
                imdb={this.goToIMDb.bind(this, data.media_type, data.id)}
                key={`mediaResult${idx}`}
            />
        );
    }

    render() {
        return (
            <div className="text-center">
                <input type="text" name="query" className="mbl" onChange={this.handleChange.bind(this)} />
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
                    <div className="faded" onClick={this.updatePosters.bind(this)}>
                        Update Posters (!)
                    </div>
                </div>
                {this.state.data.map(this.renderItem.bind(this))}
                {this.state.showPagination ? (
                    <Pagination
                        current={+this.props.match.params.page}
                        basePath={`/media/admin/${this.props.match.params.type}/${this.props.match.params.action}/`}
                    />
                ) : null}
            </div>
        );
    }
}

Search.propTypes = {
    showToast: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
};
