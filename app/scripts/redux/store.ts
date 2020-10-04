import { Action, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { defaultState } from './defaultState';
import { DefaultState } from '../interfaces';
import { reducer as baseReducer } from '../actions/base';
import { reducer as authReducer } from '../actions/auth';
import { reducer as fileReducer } from '../actions/files';
import { reducer as mediaReducer } from '../actions/media';
import { reducer as adminReducer } from '../actions/admin';
import { reducer as paginationReducer } from '../actions/pagination';

const reducer = (state: DefaultState = defaultState, action: Action): DefaultState => ({
    ...state,
    ...baseReducer(state, action),
    auth: authReducer(state.auth, action),
    files: fileReducer(state.files, action),
    media: mediaReducer(state.media, action),
    admin: adminReducer(state.admin, action),
    pagination: paginationReducer(state.pagination, action),
});

export const store = createStore(
    reducer,
    defaultState,
    composeWithDevTools(applyMiddleware<ThunkDispatch<DefaultState, undefined, Action>, DefaultState>(thunk))
);
