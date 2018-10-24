import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mediaActions from '../../actions/media.js';
import paginationActions from '../../actions/pagination.js';

import Pagination from '../page/pagination.jsx';
import MediaModal from './mediaModal.jsx';
import MediaItem from './mediaItem.jsx';

class MediaList extends React.Component {
    componentDidMount() {
        if (this.props.data) {
            this.props.dispatch(paginationActions.set(this.props.data.page));
        } else {
            this.props.dispatch(mediaActions.get({ action: this.props.type, page: this.props.page }));
            window.scrollTo(0, 0);
        }
    }

    componentDidUpdate(prevProps) {
        if (!this.props.data || this.props.type !== prevProps.type || this.props.page !== prevProps.page) {
            this.props.dispatch(mediaActions.get({ action: this.props.type, page: this.props.page }));
            window.scrollTo(0, 0);
        }
    }

    componentWillUnmount() {
        this.props.dispatch(paginationActions.reset());
    }

    setFavourite(itemType, id, favourite) {
        this.props.dispatch(mediaActions.favourite({ action: this.props.type, type: itemType || this.props.type, id, set: !favourite }));
    }

    setSeen(itemType, id, seen) {
        this.props.dispatch(mediaActions.seen({ action: this.props.type, type: itemType || this.props.type, id, set: !seen }));
    }

    update(itemType, id) {
        this.props.dispatch(mediaActions.update({ action: this.props.type, type: itemType || this.props.type, id }));
    }

    remove(itemType, id) {
        this.props.dispatch(mediaActions.remove({ action: this.props.type, type: itemType || this.props.type, id }));
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
                showItem={() => this.props.dispatch(mediaActions.showModal(item.id))}
                isLoggedIn={this.props.isLoggedIn}
            />
        ));
    }

    renderModal(item) {
        return item ? (
            <MediaModal
                type={item.type || this.props.type}
                data={item}
                isLoggedIn={this.props.isLoggedIn}
                hide={() => this.props.dispatch(mediaActions.hideModal())}
                update={this.update.bind(this, item.type, item.id)}
                remove={this.remove.bind(this, item.type, item.id)}
                setSeen={this.setSeen.bind(this, item.type, item.id, item.seen)}
                setFavourite={this.setFavourite.bind(this, item.type, item.id, item.favourite)}
            />
        ) : null;
    }

    renderStats() {
        return (
            <div className="text-center mbm">
                Total: <span className="strong">{this.props.data.stats.total}</span>, Seen:&nbsp;
                <span className="strong">{this.props.data.stats.seen}</span>, Favourite:&nbsp;
                <span className="strong">{this.props.data.stats.favourite}</span>
            </div>
        );
    }

    renderWatchlist() {
        return (
            <>
                <div>TV-Shows:</div>
                <div className="clear-fix text-center">{this.renderRows(this.props.data.results.filter(item => item.type === 'tv'))}</div>
                <div>Movies:</div>
                <div className="clear-fix text-center">
                    {this.renderRows(this.props.data.results.filter(item => item.type === 'movie'))}
                </div>
            </>
        );
    }

    renderList() {
        return (
            <>
                {this.props.data.stats ? this.renderStats() : null}
                <div className="clear-fix text-center">{this.renderRows(this.props.data.results)}</div>
                <Pagination path={`/media/${this.props.type}/`} />
            </>
        );
    }

    render() {
        return this.props.data ? (
            <>
                {this.props.type === 'watchlist' ? this.renderWatchlist() : this.renderList()}
                {this.props.item ? this.renderModal(this.props.data.results.filter(item => item.id === this.props.item).pop()) : null}
            </>
        ) : null;
    }
}

MediaList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    data: PropTypes.object,
    item: PropTypes.number,
    type: PropTypes.oneOf(['movie', 'tv', 'watchlist']).isRequired,
    page: PropTypes.number.isRequired,
};

export default connect((state, ownProps) => ({
    isLoggedIn: state.isLoggedIn,
    data: state.media[ownProps.match.params.type],
    item: state.media.item,
    type: ownProps.match.params.type,
    page: +ownProps.match.params.page || 1,
}))(MediaList);
