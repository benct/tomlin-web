import { post } from './api.js';

export default {
    init() {
        this._authenticate({ service: 'validate' });
    },

    login(email, password, cb) {
        this._authenticate({ service: 'login', user: email, pass: password }, cb);
    },

    getToken() {
        return localStorage.token;
    },

    logout() {
        delete localStorage.token;
        this.onChange(false);
    },

    loggedIn() {
        return !!localStorage.token;
    },

    onChange() {},

    _authenticate(data = {}, cb = null) {
        post(data)
            .then(response => (response ? response : Promise.reject()))
            .then(token => {
                localStorage.token = token;
                if (cb) cb(true);
                this.onChange(true);
            })
            .catch(() => {
                delete localStorage.token;
                if (cb) cb(false);
                this.onChange(false);
            });
    },
};
