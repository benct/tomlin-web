import React from 'react';

import { formatDuration, formatGradientHSL, formatYears } from '../../util/formatting.js';

import { StarIcon, ViewIcon } from '../page/Icons';
import { MediaItemEntry, MediaType } from '../../interfaces';

const defaultPoster = require('../../../images/media/poster.png');

interface MediaItemProps {
    type: MediaType;
    data: MediaItemEntry;
    setSeen: () => void;
    setFavourite: () => void;
    showItem: () => void;
}

export default class MediaItem extends React.PureComponent<MediaItemProps> {
    renderRating(): React.ReactElement {
        return (
            <>
                &nbsp;|&nbsp;
                <span className="strong">{this.props.data.rating}</span>
                <span className="text-smaller">/10</span>
            </>
        );
    }

    renderSeasons(): React.ReactElement {
        const seen = this.props.data.seen_episodes || 0;
        return (
            <>
                <span className="text-smaller">Ep. </span>
                <span className="strong" style={{ color: formatGradientHSL(seen, this.props.data.number_of_episodes) }}>
                    {seen}
                </span>
                /{this.props.data.number_of_episodes}
            </>
        );
    }

    render(): React.ReactElement {
        return (
            <div className="media-item media-item-small pvm">
                <div className="media-poster" onClick={this.props.showItem} role="button" tabIndex={0}>
                    <img
                        className="pointer"
                        src={this.props.data.poster ? `/assets/images/media${this.props.data.poster}` : defaultPoster}
                        alt={this.props.data.poster ? `Poster: ${this.props.data.title}` : 'No poster'}
                        onError={(event: React.InvalidEvent<HTMLImageElement>): void => (event.target.src = defaultPoster)}
                    />
                </div>
                <div className="media-title truncate color-primary strong pointer" onClick={this.props.showItem} role="button" tabIndex={0}>
                    {this.props.data.title}
                </div>
                <div className="media-data text-small truncate">
                    {this.props.data.imdb_id ? (
                        <a
                            href={`https://www.imdb.com/title/${this.props.data.imdb_id}`}
                            target="_blank"
                            rel="noopener noreferrer external">
                            <img
                                className="mrm"
                                src={require(`../../../images/icon/imdb.svg`)}
                                alt="IMDb"
                                width={38}
                                style={{ margin: '-12px 0' }}
                            />
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
                    <button className="button-blank mrm" data-tooltip="Seen" onClick={this.props.setSeen}>
                        <ViewIcon width={24} seen={this.props.data.seen} />
                    </button>
                    <button className="button-blank" data-tooltip="Favourite" onClick={this.props.setFavourite}>
                        <StarIcon width={24} favourite={this.props.data.favourite} />
                    </button>
                </div>
            </div>
        );
    }
}
