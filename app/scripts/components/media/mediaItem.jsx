import React from 'react';
import PropTypes from 'prop-types';

import { formatDuration } from '../../util/formatting.js';
import { StarIcon, ViewIcon, ImdbIcon } from '../page/icons.jsx';

const defaultPoster = require('../../../images/media/poster.png');

export default class MediaItem extends React.Component {
    renderImage() {
        return (
            <img
                src={this.props.poster ? `/assets/images/media${this.props.poster}` : defaultPoster}
                alt={this.props.poster ? `Poster: ${this.props.title}` : 'No poster'}
                onError={event => (event.target.src = defaultPoster)}
            />
        );
    }

    renderRating() {
        return (
            <>
                &nbsp;|&nbsp;
                <span className="strong" data-tooltip={`${this.props.votes} votes`}>
                    {this.props.rating}
                </span>
                <span className="text-smaller">/10</span>
            </>
        );
    }

    renderSeasons() {
        return (
            <>
                <span className="text-smaller">S </span>
                {this.props.seasons}
                &nbsp;|&nbsp;
                <span className="text-smaller">E </span>
                {this.props.episodes}
            </>
        );
    }

    renderYears() {
        return this.props.type === 'tv'
            ? `${this.props.release}${this.props.end ? '-' + this.props.end : String.fromCharCode(8594)}`
            : this.props.release;
    }

    render() {
        return (
            <div className="media-item media-item-small pvm">
                <div className="media-poster">
                    <a href={`https://www.imdb.com/title/${this.props.imdbId}`} target="_blank" rel="noopener noreferrer external">
                        {this.renderImage()}
                    </a>
                </div>
                <div className="media-title color-primary truncate strong">{this.props.title}</div>
                <div className="media-data text-small truncate">
                    {this.props.imdbId ? (
                        <a href={`https://www.imdb.com/title/${this.props.imdbId}`} target="_blank" rel="noopener noreferrer external">
                            <ImdbIcon width={38} className="mrm" style={{ margin: '-12px 0' }} />
                        </a>
                    ) : null}
                    <span>{this.props.type === 'tv' ? this.renderSeasons() : formatDuration(this.props.runtime)}</span>
                    {this.props.rating ? this.renderRating() : ' | No rating'}
                    <span className="hide-lt480 hide-gt768"> | {this.props.genres}</span>
                </div>
                <div className="media-actions strong text-small no-wrap">{this.props.release ? this.renderYears() : 'Unknown'}</div>
                <div className="media-external">
                    <span className={`mrm ${this.props.setSeen ? ' pointer' : ''}`} data-tooltip="Seen" onClick={this.props.setSeen}>
                        <ViewIcon width={24} seen={this.props.seen} className={this.props.seen ? '' : 'faded'} />
                    </span>
                    <span className={this.props.setFavourite ? 'pointer' : ''} data-tooltip="Favourite" onClick={this.props.setFavourite}>
                        <StarIcon width={24} favourite={this.props.favourite} className={this.props.favourite ? '' : 'faded'} />
                    </span>
                </div>
            </div>
        );
    }
}

MediaItem.propTypes = {
    type: PropTypes.oneOf(['movie', 'tv']).isRequired,
    imdbId: PropTypes.string,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    runtime: PropTypes.number,
    genres: PropTypes.string,
    rating: PropTypes.number,
    votes: PropTypes.number,
    release: PropTypes.string,
    end: PropTypes.string,
    status: PropTypes.string,
    seasons: PropTypes.number,
    episodes: PropTypes.number,
    seen: PropTypes.bool.isRequired,
    setSeen: PropTypes.func,
    favourite: PropTypes.bool.isRequired,
    setFavourite: PropTypes.func,
};
