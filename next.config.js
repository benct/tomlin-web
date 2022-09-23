const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: true,
    images: {
        domains: ['avatars.githubusercontent.com', 'cdn.tomlin.no', 'image.tmdb.org'],
    },
};

module.exports = nextConfig;
