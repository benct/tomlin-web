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

    handleSort(event) {
        if (this.props.sort !== event.target.value) {
            this.props.setSort(event.target.value);
        }
    }

    renderRows(data) {
        return data.map(item => (
            <MediaItem
                key={item.id + item.imdb_id}
                type={item.type || this.props.type}
                data={item}
                setSeen={this.props.setSeen.bind(this, item.type, item.id, item.seen)}
                setFavourite={this.props.setFavourite.bind(this, item.type, item.id, item.favourite)}
                showItem={this.props.show.bind(this, item.type, item.id)}
                isLoggedIn={this.props.isLoggedIn}
            />
        ));
    }

    renderModal(item) {
        return (
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
        );
    }

    renderStats() {
        return (
            <div>
                Total: <span className="strong">{this.props.data.stats.total}</span>
                ,&nbsp;
                {this.props.type === 'movie' ? (
                    <>
                        Seen:&nbsp;
                        <span className="strong">{this.props.data.stats.seen}</span>, Favourite:&nbsp;
                        <span className="strong">{this.props.data.stats.favourite}</span>
                    </>
                ) : (
                    <>
                        Shows seen:&nbsp;
                        <span className="strong">{this.props.data.stats.seen}</span>, Episodes seen:&nbsp;
                        <span className="strong">{this.props.data.stats.episodes}</span>
                    </>
                )}
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
                <div className="text-center">
                    {this.props.data.stats ? this.renderStats() : null}
                    <select
                        className="mvm color-base"
                        onChange={e => e.target.blur()}
                        onBlur={this.handleSort.bind(this)}
                        defaultValue={this.props.sort}>
                        <option value="rating-desc">Rating (high-low)</option>
                        <option value="rating-asc">Rating (low-high)</option>
                        <option value="release-asc">Release (first-last)</option>
                        <option value="release-desc">Release (last-first)</option>
                        <option value="title-asc">Title (alphabetical)</option>
                        <option value="title-desc">Title (reverse)</option>
                        <option value="favourite">Favourite</option>
                    </select>
                </div>
                <div className="clear-fix text-center">{this.renderRows(this.props.data.results)}</div>
                <Pagination path={`/media/${this.props.type}/`} />
            </>
        );
    }

    render() {
        return this.props.data ? (
            <>
                {this.props.type === 'watchlist' ? this.renderWatchlist() : this.renderList()}
                {this.props.showModal && this.props.item ? this.renderModal(this.props.item) : null}
            </>
        ) : null;
    }
}

MediaList.propTypes = {
    data: PropTypes.object,
    item: PropTypes.object,
    showModal: PropTypes.bool.isRequired,
    sort: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['movie', 'tv', 'watchlist']).isRequired,
    page: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,

    loadMedia: PropTypes.func.isRequired,
    setSort: PropTypes.func.isRequired,
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
    showModal: state.media.showModal,
    sort: state.media.sort,
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
        setSort: sort => {
            dispatch(mediaActions.setSort(sort));
            dispatch(mediaActions.get({ action: type, sort, page: +page || 1 }));
        },
        setPagination: page => dispatch(paginationActions.set(page)),
        resetPagination: () => dispatch(paginationActions.reset()),
        show: (itemType, id) => dispatch(mediaActions.setItem({ type: itemType || type, id })),
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
