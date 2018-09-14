import React from 'react';
import ReactDOM from 'react-dom';

import App from './app.jsx';

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

// Favicon assets
requireAll(require.context('../images/icon', true, /^\.\//));

// Other resources
requireAll(require.context('../content', true, /^\.\//));

// Render app
ReactDOM.render(<App />, document.getElementById('root'));
