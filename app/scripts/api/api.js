import 'whatwg-fetch';

const apiUrl = 'https://tomlin.no/api/';

export default function fetchContent(params = {}) {
    const query = Object.keys(params)
        .filter(k => params[k] !== null && typeof params[k] !== 'undefined')
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&');
    return fetch(`${apiUrl}?${query}`)
        .then((response) => response.json());
}
