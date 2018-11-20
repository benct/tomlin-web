/* global fetch, FormData */
import 'whatwg-fetch';

import debounce from './debounce.js';
import actions from '../actions/base.js';
import store from '../redux/store.js';
import auth from './auth.js';

const baseUrl = 'https://tomlin.no';
const baseApiUrl = 'https://tomlin.no/api/';

const delayedLoading = debounce(value => store.dispatch(actions.setLoading(value)), 250);

const checkStatus = response => (response.ok ? response : Promise.reject(response.statusText));

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
    })
        .then(checkStatus)
        .then(response => response.json());
}

export function post(data, files = null) {
    delayedLoading(true);

    return _post(data, files).finally(() => delayedLoading(false));
}

export function _get(data) {
    return fetch(`${baseApiUrl}?${query(data)}`)
        .then(checkStatus)
        .then(response => response.json());
}

export function get(data) {
    delayedLoading(true);

    return _get(data).finally(() => delayedLoading(false));
}

export function fetchFile(path) {
    return fetch(`${baseUrl}${path}`)
        .then(checkStatus)
        .then(response => response.text());
}
