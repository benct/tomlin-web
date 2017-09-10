import 'whatwg-fetch';
import auth from '../lib/auth.js';

const baseUrl = 'https://tomlin.no';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function authenticate(data, cb) {
    return fetch(`${baseUrl}/api/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(checkStatus)
        .then((response) => response.json())
        .then((data) => cb({
            authenticated: data.status === 200 && data.content,
            token: data.content
        }));
}

export function fetchContent(params = {}) {
    params.token = auth.getToken();
    const query = Object.keys(params)
        .filter(k => params[k] !== null && typeof params[k] !== 'undefined')
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&');
    return fetch(`${baseUrl}/api/?${query}`)
        .then(checkStatus)
        .then((response) =>  response.json())
        .then((data) => {
            if (data.status >= 300) {
                console.log('API error (', data.status, '):', data.errors);
            }
            return data;
        });
}

export function fetchFile(path) {
    return fetch(`${baseUrl}${path}`)
        .then(checkStatus)
        .then((response) => response.text());
}