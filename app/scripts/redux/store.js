import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import defaultState from './defaultState.js';
import { reducer as baseReducer } from '../actions/base.js';
import { reducer as fileReducer } from '../actions/files.js';
import { reducer as mediaReducer } from '../actions/media.js';
import { reducer as paginationReducer } from '../actions/pagination.js';

function reducer(state, action) {
    return Object.assign({}, baseReducer(state, action), {
        files: fileReducer(state.files, action),
        media: mediaReducer(state.media, action),
        pagination: paginationReducer(state.pagination, action),
    });
}

const store = createStore(reducer, defaultState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
