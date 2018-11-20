import quotes from '../util/quotes.js';

export default {
    isLoggedIn: false,

    showMenu: false,
    circleIcons: false,

    toast: null,
    loading: false,

    quote: {
        text: null,
        author: null,
        current: Math.floor(Math.random() * quotes.length),
    },

    home: {
        temperature: {},
        consumption: {},
        network: {},
        day: true,
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
        showModal: false,
        item: null,
        sort: 'rating-desc',
        stats: {
            movie: {},
            tv: {},
        },
    },

    pagination: {
        enabled: false,
        current: 1,
        total: 1,
    },
};
