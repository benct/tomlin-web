import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import App from './components/App';

import 'purecss/build/pure-min.css';

// Static assets
import '../.htaccess';
import '../humans.txt';
import '../robots.txt';

// Import all files in a folder
// @ts-ignore
const requireAll = (requireContext): void => requireContext.keys().map(requireContext);

// CSS resources
// @ts-ignore
requireAll(require.context('../styles', true, /^\.\//));

// Favicon/manifest assets
// @ts-ignore
requireAll(require.context('../manifest', true, /^\.\//));

// Render app
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// @ts-ignore
if (module.hot) {
    // @ts-ignore
    module.hot.accept();
}
