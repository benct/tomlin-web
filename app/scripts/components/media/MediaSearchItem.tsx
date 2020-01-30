import React from 'react';
import ISO6391 from 'iso-639-1';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';

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

const MediaSearchItem: React.FC<MediaSearchItemProps> = props => {
    const [overview, setOverview] = React.useState<boolean>(false);

    const title = props.data.title ? props.data.title : props.data.name;
    const originalTitle = props.data.original_title ? props.data.original_title : props.data.original_name;
    const release = props.data.release_date ?? props.data.first_air_date;
    const text = props.stored ? 'Remove' : 'Add';
    const change = props.stored ? props.remove : props.add;

    const validLanguage = (code: string): boolean => code === 'en' || code === 'no' || code === 'nb';

    const toggleOverview = (): void => setOverview(!overview);

    return (
        <div className="media-item pvm">
            <div className="media-poster">
                <img
                    src={props.data.poster_path ? `https://image.tmdb.org/t/p/w200${props.data.poster_path}` : defaultPoster}
                    alt={props.data.poster_path ? `Poster: ${title}` : 'No poster'}
                    onError={(event: React.InvalidEvent<HTMLImageElement>): void => (event.target.src = defaultPoster)}
                    onClick={toggleOverview}
                />
                <div
                    className="media-poster-overlay"
                    role="dialog"
                    style={{ opacity: overview ? 1 : 0, zIndex: overview ? 10 : -1 }}
                    onClick={overview ? change : undefined}>
                    <Icon path={mdiPlus} size="48px" color="white" rotate={props.stored ? 45 : 0} title={text} />
                </div>
            </div>
            <h3 className="media-title color-primary truncate man" onClick={toggleOverview}>
                {title} {formatDate(release, '(yyyy)')}
            </h3>
            <div className="media-data text-small">
                {title !== originalTitle ? <div className="text-small italic">Orig: {originalTitle}</div> : null}
                <span className={validLanguage(props.data.original_language) ? 'color-success' : 'color-warn'}>
                    {ISO6391.getName(props.data.original_language)}
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
                    <button className="button-blank" onClick={props.imdb}>
                        <img src={require(`../../../images/icon/imdb.svg`)} alt="IMDb" width={48} />
                    </button>
                    <button className="button-icon button-icon-text float-right mtm" onClick={change}>
                        <span>{text}</span>
                        <Icon path={mdiPlus} size="28px" rotate={props.stored ? 45 : 0} title={text} />
                    </button>
                </div>
            </div>
            <div className="media-actions">
                <button className="button-icon button-icon-text pan" onClick={change}>
                    <span>{text}</span>
                    <Icon path={mdiPlus} size="28px" rotate={props.stored ? 45 : 0} title={text} />
                </button>
            </div>
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
};

export default React.memo(MediaSearchItem);
