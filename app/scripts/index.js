import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app.jsx';

import store from './redux/store.js';

// Static assets
import '../.htaccess';
import '../humans.txt';
import '../robots.txt';

// Import all files in a folder
function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

// CSS resources
requireAll(require.context('../styles', true, /^\.\//));

// Favicon/manifest assets
requireAll(require.context('../manifest', true, /^\.\//));

// Other resources
requireAll(require.context('../content', true, /^\.\//));

// Render app
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
