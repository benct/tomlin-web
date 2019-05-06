import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mediaActions from '../../actions/media.js';
import paginationActions from '../../actions/pagination.js';

import Pagination from '../page/Pagination.jsx';
import MediaModal from './MediaModal.jsx';
import MediaItem from './MediaItem.jsx';

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

    handleKey(event) {
        if (event.keyCode === 13 || event.key === 'Enter') {
            this.props.loadMedia(event.target.value.length ? event.target.value : undefined);
        }
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
            />
        ));
    }

    renderModal(item) {
        return (
            <MediaModal
                type={item.type || this.props.type}
                data={item}
                close={this.props.hide}
                update={this.props.update.bind(this, item.type, item.id)}
                remove={this.props.remove.bind(this, item.type, item.id)}
                setSeen={this.props.setSeen.bind(this, item.type, item.id, item.seen)}
                setFavourite={this.props.setFavourite.bind(this, item.type, item.id, item.favourite)}
            />
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
                <div className="text-center mbl">
                    <select
                        className="media-input input-small color-light mrs"
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
                    <input
                        className="media-input input-small mls"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                        onKeyPress={this.handleKey.bind(this)}
                    />
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
        loadMedia: query => {
            dispatch(mediaActions.get({ action: type, query, page: +page || 1 }));
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
