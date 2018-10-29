/* global fetch, FormData */
import 'whatwg-fetch';

import actions from '../actions/base.js';
import store from '../redux/store.js';
import auth from './auth.js';

const baseUrl = 'https://tomlin.no';
const baseApiUrl = 'https://tomlin.no/api/';

function query(data = {}) {
    return Object.keys(data)
        .filter(key => typeof data[key] !== 'undefined' && data[key] !== null)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&');
}

function buildForm(data, files = null) {
    const formData = files || new FormData();
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
        }
    }
    formData.append('token', auth.getToken());
    return formData;
}

export function _post(data, files) {
    return fetch(baseApiUrl, {
        method: 'POST',
        body: buildForm(data, files),
    }).then(response => response.json());
}

export function post(data, files = null) {
    store.dispatch(actions.setLoading(true));

    return _post(data, files).finally(() => store.dispatch(actions.setLoading(false)));
}

export function get(data) {
    store.dispatch(actions.setLoading(true));

    return fetch(`${baseApiUrl}?${query(data)}`)
        .then(response => response.json())
        .finally(() => store.dispatch(actions.setLoading(false)));
}

export function fetchFile(path) {
    return fetch(`${baseUrl}${path}`).then(response => response.text());
}
