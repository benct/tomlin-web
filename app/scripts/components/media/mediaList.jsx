import React from 'react';
import PropTypes from 'prop-types';

import { get, post } from '../../util/api.js';

import MediaItem from './mediaItem.jsx';
import Pagination from '../page/pagination.jsx';

export default class MediaList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            stats: null,
            pages: 0,
        };
    }

    componentDidMount() {
        this.getMedia();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.type !== prevProps.match.params.type || this.props.match.params.page !== prevProps.match.params.page) {
            this.getMedia();
            window.scrollTo(0, 0);
        }
    }

    getMedia() {
        get({ service: 'media', action: this.props.match.params.type, page: +this.props.match.params.page || 1 })
            .then(response =>
                this.setState({
                    data: response.result,
                    stats: response.stats,
                    pages: response.page ? response.page.total : 0,
                })
            )
            .catch(() => {
                this.setState({ data: [], stats: null, pages: 0 });
                this.props.showToast('Could not fetch media content...');
            });
    }

    setFavourite(type, id, set) {
        post({ service: 'media', action: 'favourite', type: type || this.props.match.params.type, id, set })
            .then(() => {
                this.getMedia();
                this.props.showToast(`${set ? 'Added to' : 'Removed from'} favourites!`);
            })
            .catch(() => this.props.showToast('Could not set favourite...'));
    }

    setSeen(type, id, set) {
        post({ service: 'media', action: 'seen', type: type || this.props.match.params.type, id, set })
            .then(() => {
                this.getMedia();
                this.props.showToast(`Set as ${set ? 'seen' : 'unseen'}!`);
            })
            .catch(() => this.props.showToast('Could not set seen...'));
    }

    renderStats() {
        return this.state.stats ? (
            <div className="text-center mbm">
                Total: <span className="strong">{this.state.stats.total}</span>, Seen:&nbsp;
                <span className="strong">{this.state.stats.seen}</span>, Favourite:&nbsp;
                <span className="strong">{this.state.stats.favourite}</span>
            </div>
        ) : null;
    }

    renderRows(data) {
        return data.map(item => (
            <MediaItem
                type={item.type || this.props.match.params.type}
                key={item.id + item.imdb_id}
                id={item.id}
                imdbId={item.imdb_id}
                title={item.title}
                poster={item.poster}
                rating={item.rating}
                votes={item.votes}
                genres={item.genres}
                runtime={item.runtime}
                release={item.release_year}
                end={item.end_year}
                status={item.status}
                seasons={item.number_of_seasons}
                episodes={item.number_of_episodes}
                seen={!!item.seen}
                favourite={!!item.favourite}
                setSeen={this.props.loggedIn ? this.setSeen.bind(this, item.type, item.id, !item.seen) : null}
                setFavourite={this.props.loggedIn ? this.setFavourite.bind(this, item.type, item.id, !item.favourite) : null}
            />
        ));
    }

    render() {
        return this.props.match.params.type === 'watchlist' ? (
            <>
                <div>TV-Shows:</div>
                <div className="clear-fix text-center">{this.renderRows(this.state.data.filter(item => item.type === 'tv'))}</div>
                <div>Movies:</div>
                <div className="clear-fix text-center">{this.renderRows(this.state.data.filter(item => item.type === 'movie'))}</div>
            </>
        ) : (
            <>
                {this.renderStats()}
                <div className="clear-fix text-center">{this.renderRows(this.state.data)}</div>
                {this.state.pages > 0 ? (
                    <Pagination
                        current={+this.props.match.params.page}
                        total={this.state.pages}
                        basePath={`/media/${this.props.match.params.type}/`}
                    />
                ) : null}
            </>
        );
    }
}

MediaList.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    showToast: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
};
