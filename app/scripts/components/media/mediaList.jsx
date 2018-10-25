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
            this.props.setPagination(this.props.data.page);
        } else {
            this.props.loadMedia();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.type !== prevProps.type || this.props.page !== prevProps.page) {
            this.props.loadMedia();
        }
    }

    componentWillUnmount() {
        this.props.resetPagination();
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
                setSeen={this.props.setSeen.bind(this, item.type, item.id, item.seen)}
                setFavourite={this.props.setFavourite.bind(this, item.type, item.id, item.favourite)}
                showItem={this.props.show.bind(this, item.id)}
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
                hide={this.props.hide}
                update={this.props.update.bind(this, item.type, item.id)}
                remove={this.props.remove.bind(this, item.type, item.id)}
                setSeen={this.props.setSeen.bind(this, item.type, item.id, item.seen)}
                setFavourite={this.props.setFavourite.bind(this, item.type, item.id, item.favourite)}
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
    data: PropTypes.object,
    item: PropTypes.number,
    type: PropTypes.oneOf(['movie', 'tv', 'watchlist']).isRequired,
    page: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,

    loadMedia: PropTypes.func.isRequired,
    setPagination: PropTypes.func.isRequired,
    resetPagination: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,
    hide: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    setSeen: PropTypes.func.isRequired,
    setFavourite: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    isLoggedIn: state.isLoggedIn,
    data: state.media[ownProps.match.params.type],
    item: state.media.item,
    type: ownProps.match.params.type,
    page: +ownProps.match.params.page || 1,
});

const mapDispatchToProps = (dispatch, ownProps) => {
    const { type, page } = ownProps.match.params;
    return {
        loadMedia: () => {
            dispatch(mediaActions.get({ action: type, page: +page || 1 }));
            window.scrollTo(0, 0);
        },
        setPagination: page => dispatch(paginationActions.set(page)),
        resetPagination: () => dispatch(paginationActions.reset()),
        show: id => dispatch(mediaActions.showModal(id)),
        hide: () => dispatch(mediaActions.hideModal()),
        update: (itemType, id) => dispatch(mediaActions.update({ action: type, type: itemType || type, id })),
        remove: (itemType, id) => dispatch(mediaActions.remove({ action: type, type: itemType || type, id })),
        setSeen: (itemType, id, seen) => dispatch(mediaActions.seen({ action: type, type: itemType || type, id, set: !seen })),
        setFavourite: (itemType, id, favourite) =>
            dispatch(mediaActions.favourite({ action: type, type: itemType || type, id, set: !favourite })),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MediaList);
