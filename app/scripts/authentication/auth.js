import { authenticate } from '../api/api.js'

export default {
    init() {
        authenticate({ token: localStorage.token || '' }, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token;
                this.onChange(true);
            } else {
                delete localStorage.token;
                this.onChange(false);
            }
        });
    },

    login(email, password, cb) {
        authenticate({ user: email, pass: password }, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token;
                if (cb) cb(true);
                this.onChange(true);
            } else {
                delete localStorage.token;
                if (cb) cb(false);
                this.onChange(false);
            }
        });
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

    onChange() {}
};