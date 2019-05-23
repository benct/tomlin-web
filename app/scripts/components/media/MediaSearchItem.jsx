import React from 'react';
import PropTypes from 'prop-types';
import ISO6391 from 'iso-639-1';

import { formatDate } from '../../util/formatting.js';

import { PlusIcon } from '../page/Icons';

const defaultPoster = require('../../../images/media/poster_small.png');

export default class MediaSearchItem extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            overview: false,
        };
    }

    static validLanguage(code) {
        return code === 'en' || code === 'no' || code === 'nb';
    }

    toggleOverview() {
        this.setState({ overview: !this.state.overview });
    }

    render() {
        const text = this.props.stored ? 'Remove' : 'Add';
        const change = this.props.stored ? this.props.remove : this.props.add;

        return (
            <div className="media-item pvm">
                <div className="media-poster">
                    <img
                        src={this.props.poster ? `https://image.tmdb.org/t/p/w200${this.props.poster}` : defaultPoster}
                        alt={this.props.poster ? `Poster: ${this.props.title}` : 'No poster'}
                        onError={event => (event.target.src = defaultPoster)}
                        onClick={this.toggleOverview.bind(this)}
                    />
                    <div
                        className="media-poster-overlay"
                        role="dialog"
                        style={{ opacity: this.state.overview ? 1 : 0, zIndex: this.state.overview ? 10 : -1 }}
                        onClick={this.state.overview ? change : null}>
                        <PlusIcon width={40} height={40} fill="white" rotate={this.props.stored} />
                    </div>
                </div>
                <h3 className="media-title color-primary truncate man" onClick={this.toggleOverview.bind(this)}>
                    {this.props.title} {formatDate(this.props.release, '(yyyy)')}
                </h3>
                <div className="media-data text-small">
                    {this.props.title !== this.props.originalTitle ? (
                        <div className="text-small italic">Orig: {this.props.originalTitle}</div>
                    ) : null}
                    <span className={MediaSearchItem.validLanguage(this.props.language) ? 'color-success' : 'color-warn'}>
                        {ISO6391.getName(this.props.language)}
                    </span>
                    {this.props.rating && this.props.votes > 3 ? (
                        <span>
                            ,&nbsp;
                            <span className="strong" data-tooltip={`${this.props.votes} votes`}>
                                {this.props.rating}
                            </span>
                        </span>
                    ) : null}
                    {this.props.release ? (
                        <span>
                            ,&nbsp;
                            <span className="hide-lt480">Release: </span>
                            {formatDate(this.props.release)}
                        </span>
                    ) : null}
                    <div className="hide-gt768">
                        <button className="button-blank" onClick={this.props.imdb}>
                            <img src={require(`../../../images/icon/imdb.svg`)} alt="IMDb" width={48} />
                        </button>
                        <button className="button-icon button-text-icon float-right mtm" onClick={change}>
                            <span>{text}</span>
                            <PlusIcon width={18} height={18} rotate={this.props.stored} />
                        </button>
                    </div>
                </div>
                <div className="media-actions">
                    <button className="button-icon button-text-icon man" onClick={change}>
                        <span>{text}</span>
                        <PlusIcon width={18} height={18} rotate={this.props.stored} />
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
                    {this.props.overview === '' ? 'No description.' : this.props.overview}
                </div>
            </div>
        );
    }
}
MediaSearchItem.propTypes = {
    title: PropTypes.string.isRequired,
    originalTitle: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    poster: PropTypes.string,
    release: PropTypes.string,
    language: PropTypes.string.isRequired,
    rating: PropTypes.number,
    votes: PropTypes.number,
    stored: PropTypes.bool.isRequired,
    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    imdb: PropTypes.func.isRequired,
};
