import React from 'react';
import PropTypes from 'prop-types';

import { formatDuration, formatYears } from '../../util/formatting.js';
import { StarIcon, ViewIcon, ImdbIcon } from '../page/icons.jsx';

const defaultPoster = require('../../../images/media/poster.png');

export default class MediaItem extends React.Component {
    renderImage() {
        return (
            <img
                className="pointer"
                src={this.props.data.poster ? `/assets/images/media${this.props.data.poster}` : defaultPoster}
                alt={this.props.data.poster ? `Poster: ${this.props.data.title}` : 'No poster'}
                onError={event => (event.target.src = defaultPoster)}
                onClick={this.props.showItem}
            />
        );
    }

    renderRating() {
        return (
            <>
                &nbsp;|&nbsp;
                <span className="strong">{this.props.data.rating}</span>
                <span className="text-smaller">/10</span>
            </>
        );
    }

    renderSeasons() {
        return (
            <>
                <span className="text-smaller">S </span>
                {this.props.data.number_of_seasons}
                &nbsp;|&nbsp;
                <span className="text-smaller">E </span>
                {this.props.data.number_of_episodes}
            </>
        );
    }

    render() {
        return (
            <div className="media-item media-item-small pvm">
                <div className="media-poster">{this.renderImage()}</div>
                <div className="media-title color-primary truncate strong pointer" onClick={this.props.showItem}>
                    {this.props.data.title}
                </div>
                <div className="media-data text-small truncate">
                    {this.props.data.imdb_id ? (
                        <a
                            href={`https://www.imdb.com/title/${this.props.data.imdb_id}`}
                            target="_blank"
                            rel="noopener noreferrer external">
                            <ImdbIcon width={38} className="mrm" style={{ margin: '-12px 0' }} />
                        </a>
                    ) : null}
                    <span>{this.props.type === 'tv' ? this.renderSeasons() : formatDuration(this.props.data.runtime)}</span>
                    {this.props.data.rating ? this.renderRating() : ' | No rating'}
                    <span className="hide-lt480 hide-gt768"> | {this.props.data.genres}</span>
                </div>
                <div className="media-actions strong text-small no-wrap">
                    {formatYears(this.props.type, this.props.data.release_year, this.props.data.end_year)}
                </div>
                <div className="media-external">
                    <span className={`mrm ${this.props.isLoggedIn ? ' pointer' : ''}`} data-tooltip="Seen" onClick={this.props.setSeen}>
                        <ViewIcon width={24} seen={!!this.props.data.seen} className={this.props.data.seen ? '' : 'faded'} />
                    </span>
                    <span className={this.props.isLoggedIn ? 'pointer' : ''} data-tooltip="Favourite" onClick={this.props.setFavourite}>
                        <StarIcon width={24} favourite={!!this.props.data.favourite} className={this.props.data.favourite ? '' : 'faded'} />
                    </span>
                </div>
            </div>
        );
    }
}

MediaItem.propTypes = {
    type: PropTypes.oneOf(['movie', 'tv']).isRequired,
    data: PropTypes.object.isRequired,
    setSeen: PropTypes.func.isRequired,
    setFavourite: PropTypes.func.isRequired,
    showItem: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
};
