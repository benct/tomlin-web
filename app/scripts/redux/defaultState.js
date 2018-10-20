import quotes from '../util/quotes.js';

export default {
    isLoggedIn: false,

    showMenu: false,
    circleIcons: true,
    toast: null,

    quote: {
        text: null,
        author: null,
        current: Math.floor(Math.random() * quotes.length),
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
        data: [],
        stats: null,
    },
    search: {
        data: [],
        existing: [],
    },

    pagination: {
        enabled: false,
        current: 1,
        total: 1,
    },
};
