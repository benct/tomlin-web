const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const nextConfig = (phase) => ({
    swcMinify: true,
    trailingSlash: true,
    reactStrictMode: true,
    poweredByHeader: false,
    basePath: '',
    publicRuntimeConfig: {
        apiUrl: phase === PHASE_DEVELOPMENT_SERVER ? 'http://localhost:8081' : 'https://api.tomlin.no',
    },
    images: {
        domains: ['avatars.githubusercontent.com', 'cdn.tomlin.no', 'image.tmdb.org'],
    },
    eslint: {
        dirs: ['components', 'data', 'interfaces', 'pages', 'util'],
    },
});

module.exports = nextConfig;
