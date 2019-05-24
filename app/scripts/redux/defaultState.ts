import quotes from '../util/quotes';

import { DefaultState } from '../interfaces';

const defaultState: DefaultState = {
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
