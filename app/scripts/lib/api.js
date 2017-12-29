/* global fetch, FormData */
import 'whatwg-fetch';
import auth from '../lib/auth.js';

const baseUrl = 'https://tomlin.no';
const baseApiUrl = 'https://tomlin.no/api/';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
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
        body: buildForm(data, files)
    })
        .then(checkStatus)
        .then((response) => response.json())
}

export function fetchFile(path) {
    return fetch(`${baseUrl}${path}`)
        .then(checkStatus)
        .then((response) => response.text());
}
