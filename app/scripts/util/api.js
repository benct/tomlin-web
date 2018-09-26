/* global fetch, FormData */
import 'whatwg-fetch';

import auth from './auth.js';

const baseUrl = 'https://tomlin.no';
const baseApiUrl = 'https://tomlin.no/api/';

function checkStatus(response) {
    return response.status >= 200 && response.status < 300 ? response : Promise.reject(response.statusText);
}

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

export function post(data, files = null) {
    return fetch(baseApiUrl, {
        method: 'POST',
        body: buildForm(data, files),
    })
        .then(checkStatus)
        .then(response => response.json());
}

export function get(data) {
    return fetch(`${baseApiUrl}?${query(data)}`)
        .then(checkStatus)
        .then(response => response.json());
}

export function fetchFile(path) {
    return fetch(`${baseUrl}${path}`)
        .then(checkStatus)
        .then(response => response.text());
}
