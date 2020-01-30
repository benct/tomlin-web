import React from 'react';

import { formatDuration, formatGradientHSL, formatYears } from '../../util/formatting';
import { MediaItemEntry, MediaType } from '../../interfaces';

import { FavouriteIcon, SeenIcon } from './MediaIcons';

const cdnUrl = 'https://cdn.tomlin.no/images/media';
const defaultPoster = require('../../../images/media/poster.png');

interface MediaItemProps {
    type: MediaType;
    data: MediaItemEntry;
    setSeen: () => void;
    setFavourite: () => void;
    showItem: () => void;
}

const MediaItem: React.FC<MediaItemProps> = props => {
    const renderRating = (): React.ReactElement => (
        <>
            &nbsp;|&nbsp;
            <span className="strong">{props.data.rating}</span>
            <span className="text-smaller">/10</span>
        </>
    );

    const renderSeasons = (): React.ReactNode => {
        const seen = props.data.seen_episodes ?? 0;

        return props.data.number_of_episodes ? (
            <>
                <span className="text-smaller">Ep. </span>
                <span className="strong" style={{ color: formatGradientHSL(seen, props.data.number_of_episodes) }}>
                    {seen}
                </span>
                /{props.data.number_of_episodes}
            </>
        ) : null;
    };

    return (
        <div className="media-item media-item-small pvm">
            <div className="media-poster" onClick={props.showItem} role="button" tabIndex={0}>
                <img
                    className="pointer"
                    src={props.data.poster ? `${cdnUrl}${props.data.poster}` : defaultPoster}
                    alt={props.data.poster ? `Poster: ${props.data.title}` : 'No poster'}
                    onError={(event: React.InvalidEvent<HTMLImageElement>): void => (event.target.src = defaultPoster)}
                />
            </div>
            <div className="media-title truncate color-primary strong pointer" onClick={props.showItem} role="button" tabIndex={0}>
                {props.data.title}
            </div>
            <div className="media-data text-small truncate">
                {props.data.imdb_id ? (
                    <a href={`https://www.imdb.com/title/${props.data.imdb_id}`} target="_blank" rel="noopener noreferrer external">
                        <img
                            className="mrm"
                            src={require(`../../../images/icon/imdb.svg`)}
                            alt="IMDb"
                            width={38}
                            style={{ margin: '-12px 0' }}
                        />
                    </a>
                ) : null}
                <span>{props.type === 'tv' ? renderSeasons() : formatDuration(props.data.runtime)}</span>
                {props.data.rating ? renderRating() : ' | No rating'}
                <span className="hide-lt480 hide-gt768"> | {props.data.genres}</span>
            </div>
            <div className="media-actions strong text-small no-wrap">
                {formatYears(props.type, props.data.release_year, props.data.end_year)}
            </div>
            <div className="media-external">
                <SeenIcon seen={props.data.seen} setSeen={props.setSeen} className="mrm" />
                <FavouriteIcon favourite={props.data.favourite} setFavourite={props.setFavourite} />
            </div>
        </div>
    );
};

export default React.memo(MediaItem);
