import { FC, InvalidEvent, memo, ReactElement, useState } from 'react';
import ISO6391 from 'iso-639-1';

import { MediaSearchItemEntry } from '../../interfaces';
import { formatDate } from '../../util/formatting';

interface MediaSearchItemProps {
    data: MediaSearchItemEntry;
    stored: boolean;
    add: () => void;
    remove: () => void;
    imdb: () => void;
}

const defaultPoster = require('../../../images/media/poster_small.png');

export const MediaSearchItem: FC<MediaSearchItemProps> = memo((props) => {
    const [overview, setOverview] = useState<boolean>(false);

    const title = props.data.title ?? props.data.name;
    const originalTitle = props.data.original_title ?? props.data.original_name;
    const release = props.data.release_date ?? props.data.first_air_date;
    const language = ISO6391.getName(props.data.original_language);

    const validLanguage = (code: string): boolean => code === 'en' || code === 'no' || code === 'nb';

    const toggleOverview = (): void => setOverview(!overview);

    const renderButton = (className?: string): ReactElement => (
        <button
            className={`input input-small ${className ?? ''}`}
            onClick={props.stored ? props.remove : props.add}
            style={{ width: '70px' }}>
            {props.stored ? 'Remove' : 'Add'}
        </button>
    );

    return (
        <div className="media-item pvm">
            <div className="media-poster">
                <img
                    src={props.data.poster_path ? `https://image.tmdb.org/t/p/w200${props.data.poster_path}` : defaultPoster}
                    alt={props.data.poster_path ? `Poster: ${title}` : 'No poster'}
                    onError={(event: InvalidEvent<HTMLImageElement>): void => (event.target.src = defaultPoster)}
                    onClick={toggleOverview}
                />
            </div>
            <h3 className="media-title color-primary truncate man" onClick={toggleOverview}>
                {title} {formatDate(release, '(yyyy)')}
            </h3>
            <div className="media-data text-small">
                {title !== originalTitle ? <div className="text-small italic">Orig: {originalTitle}</div> : null}
                <span className={validLanguage(props.data.original_language) ? 'color-success' : 'color-warn'}>
                    {language !== '' ? language : 'Unknown'}
                </span>
                {props.data.vote_average ? (
                    <span>
                        ,&nbsp;
                        <span className="strong" data-tooltip={`${props.data.vote_count ?? 0} votes`}>
                            {props.data.vote_average}
                        </span>
                    </span>
                ) : null}
                {release ? (
                    <span>
                        ,&nbsp;
                        <span className="hide-lt480">Release: </span>
                        {formatDate(release)}
                    </span>
                ) : null}
                <div className="hide-gt768">
                    <button className="button-icon" onClick={props.imdb}>
                        <img src={require(`../../../images/icon/imdb.svg`)} alt="IMDb" width={48} />
                    </button>
                    {renderButton('float-right mtm')}
                </div>
            </div>
            <div className="media-actions">{renderButton()}</div>
            <div className="media-external">
                <img
                    className="pointer"
                    src={require(`../../../images/icon/imdb.svg`)}
                    alt="IMDb"
                    width={48}
                    style={{ margin: '-15px 0' }}
                    onClick={props.imdb}
                />
            </div>
            <div className={`media-overview text-small mtm${overview ? '' : ' hide-lt768'}`}>
                {props.data.overview === '' ? 'No description.' : props.data.overview}
            </div>
        </div>
    );
});

MediaSearchItem.displayName = 'MediaSearchItem';
