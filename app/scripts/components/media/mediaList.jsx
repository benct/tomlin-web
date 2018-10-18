import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../../redux/actions.js';

import MediaItem from './mediaItem.jsx';
import Pagination from '../page/pagination.jsx';

class MediaList extends React.Component {
    componentDidMount() {
        this.props.dispatch(actions.getMedia({ type: this.props.type, page: this.props.page }));
    }

    componentDidUpdate(prevProps) {
        if (this.props.type !== prevProps.type || this.props.page !== prevProps.page) {
            this.props.dispatch(actions.getMedia({ type: this.props.type, page: this.props.page }));
            window.scrollTo(0, 0);
        }
    }

    setFavourite(itemType, id, favourite) {
        this.props.dispatch(actions.setFavourite({ type: this.props.type, itemType: itemType || this.props.type, id, set: !favourite }));
    }

    setSeen(itemType, id, seen) {
        this.props.dispatch(actions.setSeen({ type: this.props.type, itemType: itemType || this.props.type, id, set: !seen }));
    }

    renderStats() {
        return this.props.media.stats ? (
            <div className="text-center mbm">
                Total: <span className="strong">{this.props.media.stats.total}</span>, Seen:&nbsp;
                <span className="strong">{this.props.media.stats.seen}</span>, Favourite:&nbsp;
                <span className="strong">{this.props.media.stats.favourite}</span>
            </div>
        ) : null;
    }

    renderRows(data) {
        return data.map(item => (
            <MediaItem
                type={item.type || this.props.type}
                key={item.id + item.imdb_id}
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
                setSeen={this.setSeen.bind(this, item.type, item.id, item.seen)}
                setFavourite={this.setFavourite.bind(this, item.type, item.id, item.favourite)}
                isLoggedIn={this.props.isLoggedIn}
            />
        ));
    }

    render() {
        return this.props.type === 'watchlist' ? (
            <>
                <div>TV-Shows:</div>
                <div className="clear-fix text-center">{this.renderRows(this.props.media.data.filter(item => item.type === 'tv'))}</div>
                <div>Movies:</div>
                <div className="clear-fix text-center">{this.renderRows(this.props.media.data.filter(item => item.type === 'movie'))}</div>
            </>
        ) : (
            <>
                {this.renderStats()}
                <div className="clear-fix text-center">{this.renderRows(this.props.media.data)}</div>
                {this.props.pagination.enabled ? (
                    <Pagination
                        current={this.props.pagination.current}
                        total={this.props.pagination.total}
                        basePath={`/media/${this.props.type}/`}
                    />
                ) : null}
            </>
        );
    }
}

MediaList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    media: PropTypes.object.isRequired,
    pagination: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
};

export default connect((state, ownProps) => ({
    isLoggedIn: state.isLoggedIn,
    media: state.media,
    pagination: state.pagination,
    type: ownProps.match.params.type,
    page: +ownProps.match.params.page || 1,
}))(MediaList);
