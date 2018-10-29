import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';

import { formatDuration, formatThousands, formatYears } from '../../util/formatting.js';

import { ImdbIcon, RefreshIcon, RemoveIcon, StarIcon, TmdbIcon, ViewIcon } from '../page/icons.jsx';
import { EqualsIcon, RecommendIcon } from '../page/icons';

export default class MediaModal extends React.PureComponent {
    componentDidMount() {
        document.body.classList.add('no-scroll');
    }

    componentWillUnmount() {
        document.body.classList.remove('no-scroll');
    }

    renderLinks(id, imdb) {
        return (
            <span>
                <a
                    href={`https://www.themoviedb.org/movie/${id}`}
                    target="_blank"
                    rel="noopener noreferrer external"
                    className="pointer"
                    data-tooltip="TMDb">
                    <TmdbIcon width={24} height={24} className="valign-middle" />
                </a>
                {imdb ? (
                    <a
                        className="mlm pointer"
                        href={`https://www.imdb.com/title/${imdb}`}
                        target="_blank"
                        rel="noopener noreferrer external"
                        data-tooltip="IMDb">
                        <ImdbIcon width={38} style={{ margin: '-12px 0' }} className="valign-middle" />
                    </a>
                ) : null}
                <Link
                    to={`/media/admin/${this.props.type}/similar/1/${id}`}
                    className={`mlm ${this.props.isLoggedIn ? 'pointer' : 'not-allowed'}`}
                    data-tooltip={this.props.isLoggedIn ? 'Find similar' : 'Log in to find similar'}
                    onClick={this.props.hide}>
                    <EqualsIcon width={24} height={24} className="valign-middle" fill="#314159" />
                </Link>
                <Link
                    to={`/media/admin/${this.props.type}/recommended/1/${id}`}
                    className={`mlm ${this.props.isLoggedIn ? 'pointer' : 'not-allowed'}`}
                    data-tooltip={this.props.isLoggedIn ? 'Recommendations' : 'Log in to find recommendations'}
                    onClick={this.props.hide}>
                    <RecommendIcon width={24} height={24} className="valign-middle" />
                </Link>
            </span>
        );
    }

    static renderPoster(poster, title) {
        return poster ? (
            <img
                src={`/assets/images/media${poster}`}
                alt={`Poster: ${title}`}
                onError={event => (event.target.src = require('../../../images/media/poster.png'))}
            />
        ) : (
            <span>No poster</span>
        );
    }

    static renderRating(rating, votes) {
        return rating ? (
            <span>
                {rating} <span className="text-smaller pls">({votes} votes)</span>
            </span>
        ) : (
            <span className="color-light">No rating</span>
        );
    }

    static renderRuntime(runtime) {
        return runtime ? (
            <>
                <span>Runtime</span>
                <span>{formatDuration(runtime)}</span>
            </>
        ) : null;
    }

    static renderCost(value) {
        return <span>{value ? `$ ${formatThousands(value)}` : ' - '}</span>;
    }

    static renderOptional(key, value) {
        return value ? (
            <>
                <span>{key}</span>
                <span>{value}</span>
            </>
        ) : null;
    }

    render() {
        return (
            <div className="overlay" onClick={event => (event.target === event.currentTarget ? this.props.hide() : null)} role="dialog">
                <div className="wrapper media-overlay shadow">
                    <div className="media-overlay-title color-primary strong pbm">
                        {this.props.data.title} ({formatYears(this.props.type, this.props.data.release_year, this.props.data.end_year)})
                    </div>
                    <div className="media-overlay-content">
                        <span>Original</span>
                        <span>{this.props.data.original_title || this.props.data.title}</span>
                        <span>Language</span>
                        <span>{this.props.data.language}</span>
                        <span>Links</span>
                        {this.renderLinks(this.props.data.id, this.props.data.imdb_id)}
                        <span>Genre(s)</span>
                        <span>{this.props.data.genres}</span>
                        <span>Release</span>
                        <span>{this.props.data.release_date ? format(this.props.data.release_date, 'MMM do, YYY') : 'Unknown'}</span>
                        <span>Rating</span>
                        {MediaModal.renderRating(this.props.data.rating, this.props.data.votes)}
                        {MediaModal.renderRuntime(this.props.data.runtime)}
                        {this.props.type === 'movie' ? (
                            <>
                                <span>Budget</span>
                                {MediaModal.renderCost(this.props.data.budget)}
                                <span>Revenue</span>
                                {MediaModal.renderCost(this.props.data.revenue)}
                                {MediaModal.renderOptional('Tagline', this.props.data.tagline)}
                            </>
                        ) : (
                            <>
                                {MediaModal.renderOptional('Seasons', this.props.data.number_of_seasons)}
                                {MediaModal.renderOptional('Episodes', this.props.data.number_of_episodes)}
                                {MediaModal.renderOptional('Type', this.props.data.series_type)}
                                <span>Status</span>
                                <span>
                                    {this.props.data.status}
                                    {this.props.data.end_year ? <span className="text-small pls">({this.props.data.end_year})</span> : null}
                                </span>
                                {MediaModal.renderOptional('Network(s)', this.props.data.networks)}
                                {MediaModal.renderOptional('Created by', this.props.data.created_by)}
                                {MediaModal.renderOptional('Production', this.props.data.production_companies)}
                            </>
                        )}
                        {MediaModal.renderOptional('Overview', this.props.data.overview)}
                        <span>Poster</span>
                        {MediaModal.renderPoster(this.props.data.poster, this.props.data.title)}
                    </div>
                    <div className="media-overlay-buttons ptm">
                        <button className="button-blank mrl" data-tooltip="Remove" onClick={this.props.remove}>
                            <RemoveIcon width={22} height={22} />
                        </button>
                        <button className="button-blank mrl" data-tooltip="Update" onClick={this.props.update}>
                            <RefreshIcon width={22} height={22} />
                        </button>
                        <button className="button-blank mrl" data-tooltip="Favourite" onClick={this.props.setFavourite}>
                            <StarIcon width={24} height={24} favourite={!!this.props.data.favourite} />
                        </button>
                        <button className="button-blank" data-tooltip="Seen" onClick={this.props.setSeen}>
                            <ViewIcon width={24} height={24} seen={!!this.props.data.seen} />
                        </button>
                        <button className="button-icon button-text-icon float-right text-small man" onClick={this.props.hide}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

MediaModal.propTypes = {
    type: PropTypes.oneOf(['movie', 'tv']).isRequired,
    data: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    setSeen: PropTypes.func.isRequired,
    setFavourite: PropTypes.func.isRequired,
};
