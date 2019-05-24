import React from 'react';
import { Link } from 'react-router-dom';

import { formatDate, formatDuration, formatThousands, formatYears } from '../../util/formatting.js';
import { MediaEpisodeEntry, MediaItemEntry, MediaSeasonEntry, MediaType } from '../../interfaces';

import { StarIcon, ViewIcon } from '../page/Icons';
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

interface MediaModalState {
    showSeasons: boolean;
}

export default class MediaModal extends React.PureComponent<MediaModalProps, MediaModalState> {
    constructor(props: MediaModalProps) {
        super(props);

        this.state = {
            showSeasons: false,
        };
    }

    componentDidMount(): void {
        document.body.classList.add('no-scroll');
    }

    componentWillUnmount(): void {
        document.body.classList.remove('no-scroll');
    }

    toggleSeasons(): void {
        this.setState({ showSeasons: !this.state.showSeasons });
    }

    static calculateSeenEpisodes(seasons: MediaSeasonEntry[]): number {
        return seasons.reduce(
            (acc: number, cur: MediaSeasonEntry): number =>
                acc + cur.episodes.reduce((acc: number, cur: MediaEpisodeEntry): number => acc + (cur.seen ? 1 : 0), 0),
            0
        );
    }

    static renderPoster(poster: string, title: string): React.ReactElement {
        return poster ? (
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
    }

    static renderRating(rating?: number, votes?: number): React.ReactElement {
        return rating ? (
            <span>
                {rating} <span className="text-smaller pls">({votes} votes)</span>
            </span>
        ) : (
            <span className="color-light">No rating</span>
        );
    }

    static renderRuntime(runtime: number | null): React.ReactNode {
        return runtime ? (
            <>
                <span>Runtime</span>
                <span>{formatDuration(runtime)}</span>
            </>
        ) : null;
    }

    static renderCost(key: string, value: number): React.ReactElement {
        return (
            <>
                <span>{key}</span>
                <span>{value ? `$ ${formatThousands(value)}` : ' - '}</span>
            </>
        );
    }

    static renderOptional(key: string, value?: string, clazz?: string): React.ReactNode {
        return value ? (
            <>
                <span>{key}</span>
                <span className={clazz}>{value}</span>
            </>
        ) : null;
    }

    renderLinks(id: number, imdb: string | null): React.ReactElement {
        return (
            <span>
                <a
                    href={`https://www.themoviedb.org/${this.props.type}/${id}`}
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
                    to={`/media/search/${this.props.type}/similar/1/${id}`}
                    className="mlm pointer"
                    data-tooltip="Find similar"
                    onClick={this.props.close}>
                    <img
                        className="valign-middle"
                        src={require(`../../../images/icon/similar.svg`)}
                        alt="Find similar"
                        width={24}
                        height={24}
                    />
                </Link>
                <Link
                    to={`/media/search/${this.props.type}/recommended/1/${id}`}
                    className="mlm pointer"
                    data-tooltip="Recommendations"
                    onClick={this.props.close}>
                    <img
                        className="valign-middle"
                        src={require(`../../../images/icon/recommend.svg`)}
                        alt="Recommendations"
                        width={24}
                        height={24}
                    />
                </Link>
            </span>
        );
    }

    renderSeasonButton(): React.ReactNode {
        return this.props.type === 'tv' ? (
            <span>
                <button className="button-default button-default-small" onClick={this.toggleSeasons.bind(this)}>
                    {this.state.showSeasons
                        ? 'Overview'
                        : `${this.props.data.number_of_seasons} ${this.props.data.number_of_seasons !== 1 ? 'seasons' : 'season'}`}
                </button>
            </span>
        ) : null;
    }

    renderSeasons(): React.ReactNode {
        return this.props.data.seasons ? (
            <div className="media-overlay-seasons">
                {this.props.data.seasons
                    .filter((s: MediaSeasonEntry): boolean => s.season > 0)
                    .map(
                        (season: MediaSeasonEntry): React.ReactNode => (
                            <MediaSeason key={`season${season.id}`} data={season} />
                        )
                    )}
            </div>
        ) : null;
    }

    renderContent(): React.ReactElement {
        return (
            <div className="media-overlay-overview">
                <span>Original</span>
                <span>{this.props.data.original_title || this.props.data.title}</span>
                <span>Language</span>
                <span>{this.props.data.language}</span>
                <span>Links</span>
                {this.renderLinks(this.props.data.id, this.props.data.imdb_id)}
                <span>Genre(s)</span>
                <span>{this.props.data.genres}</span>
                <span>Release</span>
                <span>{this.props.data.release_date ? formatDate(this.props.data.release_date) : 'Unknown'}</span>
                <span>Rating</span>
                {MediaModal.renderRating(this.props.data.rating, this.props.data.votes)}
                {MediaModal.renderRuntime(this.props.data.runtime)}
                {this.props.type === 'movie' ? (
                    <>
                        {MediaModal.renderCost('Budget', this.props.data.budget)}
                        {MediaModal.renderCost('Revenue', this.props.data.revenue)}
                        {MediaModal.renderOptional('Tagline', this.props.data.tagline, 'text-small')}
                    </>
                ) : (
                    <>
                        <span>Episodes</span>
                        <span>
                            {this.props.data.number_of_episodes} (Seen:&nbsp;
                            {this.props.data.seasons && MediaModal.calculateSeenEpisodes(this.props.data.seasons)}
                        </span>
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
                {MediaModal.renderOptional('Overview', this.props.data.overview, 'text-small')}
                <span>Poster</span>
                {MediaModal.renderPoster(this.props.data.poster, this.props.data.title)}
            </div>
        );
    }

    render(): React.ReactElement {
        return (
            <Modal close={this.props.close} className="media-overlay">
                <div className="media-overlay-title pbm">
                    <span className="color-primary strong">
                        {this.props.data.title} ({formatYears(this.props.type, this.props.data.release_year, this.props.data.end_year)})
                    </span>
                    {this.renderSeasonButton()}
                </div>
                <div className="media-overlay-content">{this.state.showSeasons ? this.renderSeasons() : this.renderContent()}</div>
                <div className="media-overlay-buttons ptm">
                    <button className="button-blank mrl" data-tooltip="Remove" onClick={this.props.remove}>
                        <img src={require(`../../../images/icon/remove.svg`)} alt="Remove" width={22} height={22} />
                    </button>
                    <button className="button-blank mrl" data-tooltip="Update" onClick={this.props.update}>
                        <img src={require(`../../../images/icon/refresh.svg`)} alt="Update" width={22} height={22} />
                    </button>
                    <button className="button-blank mrl" data-tooltip="Favourite" onClick={this.props.setFavourite}>
                        <StarIcon width={24} height={24} favourite={this.props.data.favourite} />
                    </button>
                    <button className="button-blank" data-tooltip="Seen" onClick={this.props.setSeen}>
                        <ViewIcon width={24} height={24} seen={this.props.data.seen} />
                    </button>
                    <button className="button-text float-right text-small man" onClick={this.props.close}>
                        Close
                    </button>
                </div>
            </Modal>
        );
    }
}
