import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiApproximatelyEqualBox, mdiCloseCircleOutline, mdiDeleteOutline, mdiRefresh, mdiThumbUpOutline } from '@mdi/js';

import { formatDate, formatDuration, formatThousands, formatYears } from '../../util/formatting';
import { MediaEpisodeEntry, MediaItemEntry, MediaSeasonEntry, MediaType } from '../../interfaces';

import { FavouriteIcon, SeenIcon } from './MediaIcons';
import Modal from '../page/Modal';
import MediaSeason from './MediaSeason';

interface MediaModalProps {
    type: MediaType;
    data: MediaItemEntry;
    close: () => void;
    update: () => void;
    remove: () => void;
    setSeen: () => void;
    setFavourite: () => void;
}

const MediaModal: React.FC<MediaModalProps> = props => {
    const [showSeasons, setShowSeasons] = React.useState<boolean>(false);

    React.useEffect(() => {
        document.body.classList.add('no-scroll');

        return (): void => document.body.classList.remove('no-scroll');
    }, []);

    const toggleSeasons = (): void => {
        setShowSeasons(!showSeasons);
    };

    const calculateSeenEpisodes = (seasons: MediaSeasonEntry[]): number =>
        seasons.reduce(
            (acc: number, cur: MediaSeasonEntry): number =>
                acc + cur.episodes.reduce((acc: number, cur: MediaEpisodeEntry): number => acc + (cur.seen ? 1 : 0), 0),
            0
        );

    const renderPoster = (poster: string, title: string): React.ReactElement =>
        poster ? (
            <img
                src={`/assets/images/media${poster}`}
                alt={`Poster: ${title}`}
                onError={(event: React.InvalidEvent<HTMLImageElement>): void =>
                    (event.target.src = require('../../../images/media/poster.png'))
                }
            />
        ) : (
            <span>No poster</span>
        );

    const renderRating = (rating?: number, votes?: number): React.ReactElement =>
        rating ? (
            <span>
                {rating} <span className="text-smaller pls">({votes} votes)</span>
            </span>
        ) : (
            <span>No rating</span>
        );

    const renderRuntime = (runtime: number | null): React.ReactNode =>
        runtime ? (
            <>
                <span>Runtime</span>
                <span>{formatDuration(runtime)}</span>
            </>
        ) : null;

    const renderCost = (key: string, value?: number): React.ReactElement => (
        <>
            <span>{key}</span>
            <span>{value ? `$ ${formatThousands(value)}` : ' - '}</span>
        </>
    );

    const renderOptional = (key: string, value?: string, clazz?: string): React.ReactNode =>
        value ? (
            <>
                <span>{key}</span>
                <span className={clazz}>{value}</span>
            </>
        ) : null;

    const renderLinks = (id: number, imdb: string | null): React.ReactElement => (
        <span>
            <a
                href={`https://www.themoviedb.org/${props.type}/${id}`}
                target="_blank"
                rel="noopener noreferrer external"
                className="pointer"
                data-tooltip="TMDb">
                <img className="valign-middle" src={require(`../../../images/icon/tmdb.svg`)} alt="TMDb" width={24} height={24} />
            </a>
            {imdb ? (
                <a
                    className="mlm pointer"
                    href={`https://www.imdb.com/title/${imdb}`}
                    target="_blank"
                    rel="noopener noreferrer external"
                    data-tooltip="IMDb">
                    <img
                        className="valign-middle"
                        src={require(`../../../images/icon/imdb.svg`)}
                        alt="IMDb"
                        width={38}
                        style={{ margin: '-12px 0' }}
                    />
                </a>
            ) : null}
            <Link
                to={`/media/search/${props.type}/similar/1/${id}`}
                className="mlm pointer"
                data-tooltip="Find similar"
                onClick={props.close}>
                <Icon path={mdiApproximatelyEqualBox} size="26px" title="Find similar" className="valign-middle" />
            </Link>
            <Link
                to={`/media/search/${props.type}/recommended/1/${id}`}
                className="mlm pointer"
                data-tooltip="Recommendations"
                onClick={props.close}>
                <Icon path={mdiThumbUpOutline} size="26px" title="Recommendations" className="valign-middle" />
            </Link>
        </span>
    );

    const renderSeasonButton = (): React.ReactNode =>
        props.type === 'tv' ? (
            <span>
                <button className="input input-small" onClick={toggleSeasons}>
                    {showSeasons
                        ? 'Overview'
                        : `${props.data.number_of_seasons} ${props.data.number_of_seasons !== 1 ? 'seasons' : 'season'}`}
                </button>
            </span>
        ) : null;

    const renderSeasons = (): React.ReactNode =>
        props.data.seasons ? (
            <div className="media-overlay-seasons">
                {props.data.seasons
                    .filter((s: MediaSeasonEntry): boolean => s.season > 0)
                    .map(
                        (season: MediaSeasonEntry): React.ReactNode => (
                            <MediaSeason key={`season${season.id}`} data={season} />
                        )
                    )}
            </div>
        ) : null;

    const renderContent = (): React.ReactElement => (
        <div className="media-overlay-overview">
            <span>Original</span>
            <span>{props.data.original_title || props.data.title}</span>
            <span>Language</span>
            <span>{props.data.language}</span>
            <span>Links</span>
            {renderLinks(props.data.id, props.data.imdb_id)}
            <span>Genre(s)</span>
            <span>{props.data.genres}</span>
            <span>Release</span>
            <span>{props.data.release_date ? formatDate(props.data.release_date) : 'Unknown'}</span>
            <span>Rating</span>
            {renderRating(props.data.rating, props.data.votes)}
            {renderRuntime(props.data.runtime)}
            {props.type === 'movie' ? (
                <>
                    {renderCost('Budget', props.data.budget)}
                    {renderCost('Revenue', props.data.revenue)}
                    {renderOptional('Tagline', props.data.tagline, 'text-small')}
                </>
            ) : (
                <>
                    <span>Episodes</span>
                    <span>
                        {props.data.number_of_episodes} (Seen:&nbsp;
                        {props.data.seasons && calculateSeenEpisodes(props.data.seasons)})
                    </span>
                    {renderOptional('Type', props.data.series_type)}
                    <span>Status</span>
                    <span>
                        {props.data.status}
                        {props.data.end_year ? <span className="text-small pls">({props.data.end_year})</span> : null}
                    </span>
                    {renderOptional('Network(s)', props.data.networks)}
                    {renderOptional('Created by', props.data.created_by)}
                    {renderOptional('Production', props.data.production_companies)}
                </>
            )}
            {renderOptional('Overview', props.data.overview, 'text-small')}
            <span>Poster</span>
            {renderPoster(props.data.poster, props.data.title)}
        </div>
    );

    return (
        <Modal close={props.close}>
            <div className="media-overlay-title border-bottom pbm">
                <span className="color-primary strong">
                    {props.data.title} ({formatYears(props.type, props.data.release_year, props.data.end_year)})
                </span>
                {renderSeasonButton()}
            </div>
            <div className="overlay-modal-content">{showSeasons ? renderSeasons() : renderContent()}</div>
            <div className="border-top ptm">
                <button className="button-blank mrl" data-tooltip="Remove" onClick={props.remove}>
                    <Icon path={mdiDeleteOutline} size="28px" title="Update" />
                </button>
                <button className="button-blank mrl" data-tooltip="Update" onClick={props.update}>
                    <Icon path={mdiRefresh} size="28px" title="Update" />
                </button>
                <SeenIcon seen={props.data.seen} setSeen={props.setSeen} size="28px" className="mrl" />
                <FavouriteIcon favourite={props.data.favourite} setFavourite={props.setFavourite} size="28px" />
                <button className="button-blank float-right" data-tooltip="Close" onClick={props.close}>
                    <Icon path={mdiCloseCircleOutline} size="28px" title="Close" />
                </button>
            </div>
        </Modal>
    );
};

export default React.memo(MediaModal);
