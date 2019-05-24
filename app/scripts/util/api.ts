/* global fetch, FormData */
import 'whatwg-fetch';

import debounce from './debounce';
import actions from '../actions/base.js';
import store from '../redux/store.js';
import auth from './auth';

const baseUrl = 'https://tomlin.no';
const baseApiUrl = 'https://api.tomlin.no';

const delayedLoading = debounce((value: boolean): void => store.dispatch(actions.setLoading(value)), 150);

const checkStatus = (response: Response): Promise<Response> =>
    response.ok ? Promise.resolve(response) : Promise.reject(response.statusText);

interface DataObject {
    [key: string]: string;
}

function query(data: DataObject = {}): string {
    return Object.keys(data)
        .filter((key: string): boolean => typeof data[key] !== 'undefined' && data[key] !== null)
        .map((key: string): string => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&');
}

function buildForm(data: DataObject, files?: FormData): FormData {
    const formData = files || new FormData();
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
        }
    }
    formData.append('token', auth.getToken());
    return formData;
}

export function _post<T>(data: DataObject, files?: FormData): Promise<T> {
    return fetch(baseApiUrl, {
        method: 'POST',
        body: buildForm(data, files),
    })
        .then(checkStatus)
        .then((response: Response): Promise<T> => response.json());
}

export function post<T>(data: DataObject, files?: FormData): Promise<T> {
    delayedLoading(true);

    return _post<T>(data, files).finally((): void => delayedLoading(false));
}

export function _get<T>(data: DataObject): Promise<T> {
    return fetch(`${baseApiUrl}/?${query(data)}`)
        .then(checkStatus)
        .then((response: Response): Promise<T> => response.json());
}

export function get<T>(data: DataObject): Promise<T> {
    delayedLoading(true);

    return _get<T>(data).finally((): void => delayedLoading(false));
}

export function fetchFile(path: string): Promise<string> {
    return fetch(`${baseUrl}${path}`)
        .then(checkStatus)
        .then((response: Response): Promise<string> => response.text());
}
