import quotes from '../util/quotes.js';

export default {
    isLoggedIn: false,

    showMenu: false,
    circleIcons: false,
    toast: null,

    quote: {
        text: null,
        author: null,
        current: Math.floor(Math.random() * quotes.length),
    },

    files: {
        cwd: '',
        content: [],
        focused: null,
        preview: null,
        uploading: false,
    },

    links: {
        content: null,
        loading: false,
    },
    notes: {
        content: null,
        loading: false,
    },

    media: {
        movie: null,
        tv: null,
        watchlist: null,
        search: [],
        existing: [],
        item: null,
        sort: 'rating-desc',
    },

    pagination: {
        enabled: false,
        current: 1,
        total: 1,
    },
};
