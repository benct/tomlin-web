import quotes from '../util/quotes';

import { DefaultState } from '../interfaces';

const defaultState: DefaultState = {
    showMenu: false,
    circleIcons: false,
    toast: null,

    loading: false,
    loadingOverlay: false,

    auth: {
        isLoggedIn: false,
        redirect: false,
        error: false,
    },

    home: {
        temperature: {},
        consumption: {},
        day: true,
    },

    quote: {
        text: null,
        author: null,
        current: Math.floor(Math.random() * quotes.length),
    },

    github: {
        user: null,
        top: [],
        featured: [],
    },

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
        existing: [],
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
        logs: [],
        visits: [],
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
