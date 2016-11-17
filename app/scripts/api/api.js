import 'whatwg-fetch';

const apiUrl = 'https://tomlin.no/api/';

export default function fetchContent(params = {}) {
    const query = Object.keys(params)
        .filter(k => params[k] !== null && typeof params[k] !== 'undefined')
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&');
    return fetch(`${apiUrl}?${query}`)
        .then((response) => {
            if (response.status >= 300) {
                console.log('Network error (', response.status, '):', response.statusText);
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
