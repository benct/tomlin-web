import React from 'react';
import ISO6391 from 'iso-639-1';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';

import { MediaSearchItemEntry } from '../../interfaces';
import { formatDate } from '../../util/formatting';

const defaultPoster = require('../../../images/media/poster_small.png');

interface MediaSearchItemProps {
    data: MediaSearchItemEntry;
    stored: boolean;
    add: () => void;
    remove: () => void;
    imdb: () => void;
}

interface MediaSearchItemState {
    overview: boolean;
}

export default class MediaSearchItem extends React.PureComponent<MediaSearchItemProps, MediaSearchItemState> {
    constructor(props: MediaSearchItemProps) {
        super(props);

        this.state = {
            overview: false,
        };
    }

    static validLanguage(code: string): boolean {
        return code === 'en' || code === 'no' || code === 'nb';
    }

    toggleOverview(): void {
        this.setState({ overview: !this.state.overview });
    }

    render(): React.ReactElement {
        const title = this.props.data.title ? this.props.data.title : this.props.data.name;
        const originalTitle = this.props.data.original_title ? this.props.data.original_title : this.props.data.original_name;
        const release = this.props.data.release_date || this.props.data.first_air_date;
        const text = this.props.stored ? 'Remove' : 'Add';
        const change = this.props.stored ? this.props.remove : this.props.add;

        return (
            <div className="media-item pvm">
                <div className="media-poster">
                    <img
                        src={this.props.data.poster_path ? `https://image.tmdb.org/t/p/w200${this.props.data.poster_path}` : defaultPoster}
                        alt={this.props.data.poster_path ? `Poster: ${title}` : 'No poster'}
                        onError={(event: React.InvalidEvent<HTMLImageElement>): void => (event.target.src = defaultPoster)}
                        onClick={this.toggleOverview.bind(this)}
                    />
                    <div
                        className="media-poster-overlay"
                        role="dialog"
                        style={{ opacity: this.state.overview ? 1 : 0, zIndex: this.state.overview ? 10 : -1 }}
                        onClick={this.state.overview ? change : undefined}>
                        <Icon path={mdiPlus} size="48px" color="white" rotate={this.props.stored ? 45 : 0} title={text} />
                    </div>
                </div>
                <h3 className="media-title color-primary truncate man" onClick={this.toggleOverview.bind(this)}>
                    {title} {formatDate(release, '(yyyy)')}
                </h3>
                <div className="media-data text-small">
                    {title !== originalTitle ? <div className="text-small italic">Orig: {originalTitle}</div> : null}
                    <span className={MediaSearchItem.validLanguage(this.props.data.original_language) ? 'color-success' : 'color-warn'}>
                        {ISO6391.getName(this.props.data.original_language)}
                    </span>
                    {this.props.data.vote_average ? (
                        <span>
                            ,&nbsp;
                            <span className="strong" data-tooltip={`${this.props.data.vote_count || 0} votes`}>
                                {this.props.data.vote_average}
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
                        <button className="button-blank" onClick={this.props.imdb}>
                            <img src={require(`../../../images/icon/imdb.svg`)} alt="IMDb" width={48} />
                        </button>
                        <button className="button-icon button-text-icon float-right mtm" onClick={change}>
                            <span>{text}</span>
                            <Icon path={mdiPlus} size="28px" rotate={this.props.stored ? 45 : 0} title={text} />
                        </button>
                    </div>
                </div>
                <div className="media-actions">
                    <button className="button-icon button-text-icon man" onClick={change}>
                        <span>{text}</span>
                        <Icon path={mdiPlus} size="28px" rotate={this.props.stored ? 45 : 0} title={text} />
                    </button>
                </div>
                <div className="media-external">
                    <img
                        className="pointer"
                        src={require(`../../../images/icon/imdb.svg`)}
                        alt="IMDb"
                        width={48}
                        style={{ margin: '-15px 0' }}
                        onClick={this.props.imdb}
                    />
                </div>
                <div className={`media-overview text-small mtm${this.state.overview ? '' : ' hide-lt768'}`}>
                    {this.props.data.overview === '' ? 'No description.' : this.props.data.overview}
                </div>
            </div>
        );
    }
}
