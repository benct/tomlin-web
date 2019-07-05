import { AnyAction, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import defaultState from './defaultState';
import { DefaultState } from '../interfaces';
import { reducer as baseReducer } from '../actions/base.js';
import { reducer as authReducer } from '../actions/auth';
import { reducer as githubReducer } from '../actions/github';
import { reducer as fileReducer } from '../actions/files.js';
import { reducer as mediaReducer } from '../actions/media.js';
import { reducer as adminReducer } from '../actions/admin.js';
import { reducer as paginationReducer } from '../actions/pagination';

const reducer = (state: DefaultState = defaultState, action: AnyAction): DefaultState => ({
    ...state,
    ...baseReducer(state, action),
    auth: authReducer(state.auth, action),
    github: githubReducer(state.github, action),
    files: fileReducer(state.files, action),
    media: mediaReducer(state.media, action),
    admin: adminReducer(state.admin, action),
    pagination: paginationReducer(state.pagination, action),
});

const store = createStore(reducer, defaultState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
