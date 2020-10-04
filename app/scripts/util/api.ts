import { Action } from 'redux';

import debounce from './debounce';
import actions from '../actions/base';
import store from '../redux/store';

type ApiParams = Record<string, any>;

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
    const formData = files ?? new FormData();
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key) && typeof data[key] !== 'undefined' && data[key] !== null) {
            formData.append(key, data[key]);
        }
    }
    return formData;
};

const api = <T>(method: string, path: string, body?: FormData, type?: string): Promise<T> =>
    fetch(baseApiUrl + path, {
        method: method,
        body: body ?? null,
        headers: authHeader(),
        mode: 'cors',
    })
        .then(checkStatus)
        .then((response: Response): Promise<T> => (type == 'text' ? response.text() : type == 'blob' ? response.blob() : response.json()));

export const load = <T>(method: string, path: string, body?: FormData, type?: string): Promise<T> => {
    delayedLoading(true);

    return api<T>(method, path, body, type).finally(() => delayedLoading(false));
};

export const get = <T>(path: string, params?: ApiParams): Promise<T> => {
    store.dispatch(actions.setLoading(true));

    return api<T>('GET', path + query(params)).finally(() => store.dispatch(actions.setLoading(false)));
};

export const auth = <T>(path: string): Promise<T> => api('POST', path, buildForm({ referrer: document.referrer }));

export const post = <T>(path: string, params?: ApiParams, files?: FormData): Promise<T> => load('POST', path, buildForm(params, files));

export const del = <T>(path: string, params?: ApiParams): Promise<T> => load('DELETE', path, buildForm(params));

export const text = (path: string, params?: ApiParams): Promise<string> => load('POST', path, buildForm(params), 'text');

export const blob = (path: string, params?: ApiParams): Promise<Blob> => load('POST', path, buildForm(params), 'blob');
