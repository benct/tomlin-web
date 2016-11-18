import 'whatwg-fetch';

const baseUrl = 'https://tomlin.no';

export function fetchContent(params = {}) {
    const query = Object.keys(params)
        .filter(k => params[k] !== null && typeof params[k] !== 'undefined')
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&');
    return fetch(`${baseUrl}/api/?${query}`)
        .then((response) => {
            if (response.status >= 300) {
                console.log('HTTP error (', response.status, '):', response.statusText);
            }
            return response.json();
        }).then((data) => {
            if (data.status >= 300) {
                console.log('API error (', data.status, '):', data.content);
                return {};
            }
            return data.content;
        });
}

export function fetchFile(path) {
    return fetch(`${baseUrl}${path}`)
        .then((response) => {
            if (response.status >= 300) {
                console.log('HTTP error (', response.status, '):', response.statusText);
            }
            return response.text();
        });
}