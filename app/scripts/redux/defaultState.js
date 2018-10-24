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
        list: [],
        search: [],
        item: null,
        stats: null,
        existing: [],
    },

    pagination: {
        enabled: false,
        current: 1,
        total: 1,
    },
};
