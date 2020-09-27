import { quotes } from '../util/quotes';

import { DefaultState } from '../interfaces';

const defaultState: DefaultState = {
    showMenu: false,
    toast: null,
    theme: localStorage.getItem('theme') ?? 'default',

    loading: false,
    loadingOverlay: false,

    settings: {},

    auth: {
        isLoggedIn: false,
        redirect: false,
        error: false,
        loading: false,
    },

    home: {},

    quote: {
        text: null,
        author: null,
        current: Math.floor(Math.random() * quotes.length),
    },

    github: {
        user: null,
        stars: 0,
        top: [],
        featured: [],
    },

    finn: {},

    files: {
        cwd: '',
        content: [],
        focused: null,
        preview: null,
        uploading: false,
    },

    media: {
        movie: null,
        tv: null,
        watchlist: null,
        search: [],
        existing: {
            movie: [],
            tv: [],
        },
        showModal: false,
        item: null,
        sort: 'rating-desc',
        stats: {
            movie: {},
            tv: {},
        },
    },

    admin: {
        stats: {},
        logs: null,
        visits: null,
        hass: [],
        flights: [],
        notes: [],
    },

    pagination: {
        enabled: false,
        current: 1,
        total: 1,
        first: true,
        previous: 1,
        next: 1,
        last: true,
        previousPages: [],
        consecutivePages: [],
    },
};

export default defaultState;
