import React from 'react';
import PropTypes from 'prop-types';
import ISO6391 from 'iso-639-1';
import format from 'date-fns/format';

import { ImdbIcon, PlusIcon } from '../page/icons.jsx';

const defaultPoster = require('../../../images/media/poster_small.png');

export default class SearchItem extends React.Component {
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

    renderImage() {
        return (
            <img
                src={this.props.poster ? `https://image.tmdb.org/t/p/w200${this.props.poster}` : defaultPoster}
                alt={this.props.poster ? `Poster: ${this.props.title}` : 'No poster'}
                onError={event => (event.target.src = defaultPoster)}
                onClick={this.toggleOverview.bind(this)}
            />
        );
    }

    render() {
        const change = this.props.stored ? this.props.remove : this.props.add;
        const rotation = this.props.stored ? { transform: 'rotate(45deg)' } : null;
        return (
            <div className="media-item pvm">
                <div className="media-poster">
                    {this.renderImage()}
                    <div
                        className="media-poster-overlay"
                        style={{ opacity: this.state.overview ? 1 : 0, zIndex: this.state.overview ? 10 : -1 }}
                        onClick={this.state.overview ? change : null}>
                        <PlusIcon width={40} height={40} fill="white" style={rotation} />
                    </div>
                </div>
                <h3 className="media-title color-primary truncate man" onClick={this.toggleOverview.bind(this)}>
                    {this.props.title} {this.props.release && this.props.release !== '' ? `(${format(this.props.release, 'yyyy')})` : null}
                </h3>
                <div className="media-data text-small">
                    {this.props.title !== this.props.originalTitle ? (
                        <div className="text-small italic">Orig: {this.props.originalTitle}</div>
                    ) : null}
                    <span className={SearchItem.validLanguage(this.props.language) ? 'color-success' : 'color-warn'}>
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
                            {format(this.props.release, 'MMM do, YYY')}
                        </span>
                    ) : null}
                    <ImdbIcon
                        width={48}
                        className="hide-gt768 pointer"
                        style={{ margin: '-5px 0', display: 'block' }}
                        onClick={this.props.imdb}
                    />
                </div>
                <div className="media-actions">
                    <button className="button-icon button-text-icon man" onClick={change}>
                        <span>{this.props.stored ? 'Remove' : 'Add'}</span>
                        <PlusIcon width={18} height={18} style={rotation} />
                    </button>
                </div>
                <div className="media-external">
                    <ImdbIcon width={48} className="pointer" style={{ margin: '-15px 0' }} onClick={this.props.imdb} />
                </div>
                <div className={`media-overview text-small mtm${this.state.overview ? '' : ' hide-lt768'}`}>
                    {this.props.overview === '' ? 'No description.' : this.props.overview}
                </div>
            </div>
        );
    }
}
SearchItem.propTypes = {
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
