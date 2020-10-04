import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import { App } from './components/App';

// Static assets
import '../.htaccess';
import '../humans.txt';
import '../robots.txt';

// Favicon/manifest assets
import '../manifest/manifest.json';
import '../manifest/browserconfig.xml';
import '../manifest/favicon.ico';
import '../manifest/favicon-16x16.png';
import '../manifest/favicon-32x32.png';
import '../manifest/android-chrome-192x192.png';
import '../manifest/android-chrome-512x512.png';
import '../manifest/apple-touch-icon.png';
import '../manifest/mstile-150x150.png';
import '../manifest/safari-pinned-tab.svg';

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
