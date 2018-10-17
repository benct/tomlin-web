import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import defaultState from './defaultState.js';
import { reducer } from './actions.js';

const store = createStore(reducer, defaultState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
