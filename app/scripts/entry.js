// Import all files in a folder
function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

// Static assets
import '../.htaccess';
import '../humans.txt';
import '../robots.txt';

// CSS resources
requireAll(require.context('../styles', true, /^\.\//));

// Favicon assets
requireAll(require.context('../images/icon', true, /^\.\//));

// Javascript app entry
import './main.js';