import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { formatDate } from '../../util/formatting.js';
import { ViewIcon } from '../page/icons.jsx';

import mediaActions from '../../actions/media.js';

class Season extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            showEpisodes: false,
            title: null,
            overview: null,
        };
    }

    toggleEpisodes() {
        this.setState({ showEpisodes: !this.state.showEpisodes });
    }

    setOverview(title, overview) {
        this.setState({ title, overview });
    }

    setAllSeen() {
        this.props.dispatch(
            mediaActions.seenEpisodes({ seasonId: this.props.data.id, episodeIds: this.props.data.episodes.map(episode => episode.id) })
        );
    }

    renderEpisodes() {
        return this.props.data.episodes.map(episode => (
            <React.Fragment key={`episode${episode.id}`}>
                <span className="text-small pll">{episode.episode}</span>
                <button
                    className="button-blank text-small text-left truncate"
                    onClick={this.setOverview.bind(this, episode.title, episode.overview)}>
                    {episode.title}
                </button>
                <span className="text-small text-right">{episode.release_date ? formatDate(episode.release_date, 'MMM do') : null}</span>
                <button
                    className="button-blank mrm"
                    style={{ height: '22px' }}
                    onClick={() => this.props.dispatch(mediaActions.seenEpisode({ id: episode.id, set: !episode.seen }))}>
                    <ViewIcon width={22} height={22} seen={!!episode.seen} />
                </button>
            </React.Fragment>
        ));
    }

    render() {
        const episodesSeen = this.props.data.episodes.filter(e => !!e.seen).length;
        const episodesTotal = this.props.data.episodes.length;

        return (
            <>
                <span className="pts">
                    <button className="button-default button-default-small float-right" onClick={this.toggleEpisodes.bind(this)}>
                        {episodesSeen}/{episodesTotal}
                    </button>
                    {episodesSeen === 0 ? (
                        <button className="button-default button-default-small float-right mrm" onClick={this.setAllSeen.bind(this)}>
                            Mark all
                        </button>
                    ) : null}
                    <span className="text-small prl">{this.props.data.season}</span>
                    <button className="button-blank border-bottom" onClick={this.toggleEpisodes.bind(this)}>
                        {this.props.data.title}
                    </button>
                    <span className="text-small plm">{formatDate(this.props.data.release_date, '(MMM do, YYY)')}</span>
                </span>
                {this.state.showEpisodes ? (
                    <div className="media-overlay-episodes">
                        {this.renderEpisodes()}
                        {this.state.overview ? (
                            <div className="media-overlay-episode-overview shadow" role="dialog" onClick={this.setOverview.bind(this)}>
                                <span>{this.state.title}</span>
                                <span className="text-small">{this.state.overview}</span>
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </>
        );
    }
}

Season.propTypes = {
    data: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default connect()(Season);
