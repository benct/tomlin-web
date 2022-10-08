import getConfig from 'next/config';
import { formatQuery } from './formatting';
import { debounce } from './debounce';

type ApiParams = Record<string, any>;

const { publicRuntimeConfig } = getConfig();

// TODO reimplement loading overlay?
let loadingOverlay = false;
const delayedLoading = debounce((value: boolean): void => {
    loadingOverlay = value;
}, 150);

const authHeader = (): Record<string, string> => {
    const token = window.localStorage.getItem('token');
    return token ? { Authorization: `Basic ${token}` } : {};
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
    fetch(publicRuntimeConfig.apiUrl + path, {
        method: method,
        body: body ?? null,
        headers: authHeader(),
        mode: 'cors',
    })
        .then((response: Response): Promise<Response> => {
            if (!response.ok) throw new Error(`Error (${response.status}) while fetching data from API.`);
            return Promise.resolve(response);
        })
        .then((response: Response): Promise<T> => (type == 'text' ? response.text() : type == 'blob' ? response.blob() : response.json()));

export const load = <T>(method: string, path: string, body?: FormData, type?: string): Promise<T> => {
    delayedLoading(true);

    return api<T>(method, path, body, type).finally(() => delayedLoading(false));
};

export const get = <T>(path: string, params?: ApiParams): Promise<T> => api<T>('GET', path + formatQuery(params));

export const auth = <T>(path: string): Promise<T> => api('POST', path, buildForm({ referrer: document.referrer }));

export const post = <T>(path: string, params?: ApiParams, files?: FormData): Promise<T> => load('POST', path, buildForm(params, files));

export const del = <T>(path: string, params?: ApiParams): Promise<T> => load('DELETE', path, buildForm(params));

export const text = (path: string, params?: ApiParams): Promise<string> => load('POST', path, buildForm(params), 'text');

export const blob = (path: string, params?: ApiParams): Promise<Blob> => load('POST', path, buildForm(params), 'blob');
