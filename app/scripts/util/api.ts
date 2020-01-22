import 'whatwg-fetch';
import { Action } from 'redux';

import debounce from './debounce';
import actions from '../actions/base';
import store from '../redux/store';

export interface ApiParams {
    [key: string]: any;
}

export interface ApiOptions {
    params?: ApiParams;
    files?: FormData;
    loading?: boolean;
}

const baseUrl = 'https://tomlin.no';
const baseApiUrl = 'https://api.tomlin.no';

const delayedLoading = debounce((value: boolean): Action => store.dispatch(actions.setLoadingOverlay(value)), 150);

const checkStatus = (response: Response): Promise<Response> =>
    response.ok ? Promise.resolve(response) : Promise.reject(response.statusText);

const authHeader = (): Record<string, string> => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Basic ${token}` } : {};
};

const query = (data: ApiParams = {}): string => {
    const params = Object.keys(data)
        .filter((key: string): boolean => typeof data[key] !== 'undefined' && data[key] !== null)
        .map((key: string): string => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);

    return params.length > 0 ? `?${params.join('&')}` : '';
};

const buildForm = (data?: ApiParams, files?: FormData): FormData => {
    const formData = files || new FormData();
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key) && typeof data[key] !== 'undefined' && data[key] !== null) {
            formData.append(key, data[key]);
        }
    }
    return formData;
};

export const api = <T>(method: string, path: string, options: ApiOptions = {}): Promise<T> => {
    if (options.loading !== false) delayedLoading(true);

    return fetch(baseApiUrl + path, {
        method: method,
        body: method !== 'GET' ? buildForm(options.params, options.files) : null,
        headers: authHeader(),
    })
        .then(checkStatus)
        .then((response: Response): Promise<T> => response.json())
        .finally(() => {
            if (options.loading !== false) delayedLoading(false);
        });
};

export const get = <T>(path: string, params?: ApiParams): Promise<T> => api('GET', path + query(params));

export const post = <T>(path: string, params?: ApiParams, files?: FormData): Promise<T> => api('POST', path, { params, files });

export const del = <T>(path: string): Promise<T> => api('DELETE', path);

export const auth = <T>(path: string): Promise<T> => api('POST', path, { params: { referrer: document.referrer }, loading: false });

export const getContent = (path: string): Promise<string> =>
    fetch(`${baseUrl}${path}`)
        .then(checkStatus)
        .then((response: Response): Promise<string> => response.text());

export const getExternal = <T>(url: string): Promise<T> =>
    fetch(url)
        .then(checkStatus)
        .then((response: Response): Promise<T> => response.json());
