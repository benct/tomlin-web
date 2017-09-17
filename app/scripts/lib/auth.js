import { post } from '../lib/api.js';

export default {
    init() {
        this._authenticate();
    },

    login(email, password, cb) {
        this._authenticate({ user: email, pass: password }, cb);
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
            .then((response) => {
                if (response.status === 200 && response.content) {
                    localStorage.token = response.content;
                    if (cb) cb(true);
                    this.onChange(true);
                } else {
                    delete localStorage.token;
                    if (cb) cb(false);
                    this.onChange(false);
                }
            });
    }
};