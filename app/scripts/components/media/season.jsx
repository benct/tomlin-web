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
        };
    }

    toggleEpisodes() {
        this.setState({ showEpisodes: !this.state.showEpisodes });
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
                <span className="text-small truncate">{episode.title}</span>
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
                    <span className="border-bottom">{this.props.data.title}</span>
                    <span className="text-small plm">{formatDate(this.props.data.release_date, '(MMM do, YYY)')}</span>
                </span>
                {this.state.showEpisodes ? <div className="media-overlay-episodes">{this.renderEpisodes()}</div> : null}
            </>
        );
    }
}

Season.propTypes = {
    data: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default connect()(Season);
