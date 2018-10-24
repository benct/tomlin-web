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
        this.props.dispatch(mediaActions.get({ action: this.props.type, page: this.props.page }));
    }

    componentDidUpdate(prevProps) {
        if (this.props.type !== prevProps.type || this.props.page !== prevProps.page) {
            this.props.dispatch(mediaActions.get({ action: this.props.type, page: this.props.page }));
            window.scrollTo(0, 0);
        }
    }

    componentWillUnmount() {
        this.props.dispatch(mediaActions.clear());
        this.props.dispatch(paginationActions.reset());
    }

    setFavourite(itemType, id, favourite) {
        this.props.dispatch(mediaActions.favourite({ action: this.props.type, type: itemType || this.props.type, id, set: !favourite }));
    }

    setSeen(itemType, id, seen) {
        this.props.dispatch(mediaActions.seen({ action: this.props.type, type: itemType || this.props.type, id, set: !seen }));
    }

    update(itemType, id) {
        this.props.dispatch(mediaActions.update({ type: itemType || this.props.type, id }));
    }

    remove(itemType, id) {
        this.props.dispatch(mediaActions.remove({ type: itemType || this.props.type, id }));
    }

    renderStats() {
        return this.props.stats ? (
            <div className="text-center mbm">
                Total: <span className="strong">{this.props.stats.total}</span>, Seen:&nbsp;
                <span className="strong">{this.props.stats.seen}</span>, Favourite:&nbsp;
                <span className="strong">{this.props.stats.favourite}</span>
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
                showItem={() => this.props.dispatch(mediaActions.showItem(item))}
                isLoggedIn={this.props.isLoggedIn}
            />
        ));
    }

    renderList() {
        return this.props.type === 'watchlist' ? (
            <>
                <div>TV-Shows:</div>
                <div className="clear-fix text-center">{this.renderRows(this.props.data.filter(item => item.type === 'tv'))}</div>
                <div>Movies:</div>
                <div className="clear-fix text-center">{this.renderRows(this.props.data.filter(item => item.type === 'movie'))}</div>
            </>
        ) : (
            <>
                {this.renderStats()}
                <div className="clear-fix text-center">{this.renderRows(this.props.data)}</div>
                <Pagination path={`/media/${this.props.type}/`} />
            </>
        );
    }

    render() {
        return (
            <>
                {this.renderList()}
                {this.props.item ? (
                    <MediaModal
                        type={this.props.item.type || this.props.type}
                        data={this.props.item}
                        isLoggedIn={this.props.isLoggedIn}
                        hide={() => this.props.dispatch(mediaActions.hideItem())}
                        update={this.update.bind(this, this.props.item.type, this.props.item.id)}
                        remove={this.remove.bind(this, this.props.item.type, this.props.item.id)}
                        setSeen={this.setSeen.bind(this, this.props.item.type, this.props.item.id, this.props.item.seen)}
                        setFavourite={this.setFavourite.bind(this, this.props.item.type, this.props.item.id, this.props.item.favourite)}
                    />
                ) : null}
            </>
        );
    }
}

MediaList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    stats: PropTypes.object,
    item: PropTypes.object,
    type: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
};

export default connect((state, ownProps) => ({
    isLoggedIn: state.isLoggedIn,
    data: state.media.list,
    stats: state.media.stats,
    item: state.media.item,
    type: ownProps.match.params.type,
    page: +ownProps.match.params.page || 1,
}))(MediaList);
