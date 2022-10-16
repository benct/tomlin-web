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
        domains: ['avatars.githubusercontent.com', 'image.tmdb.org', 'storage.googleapis.com'],
    },
});

module.exports = nextConfig;
