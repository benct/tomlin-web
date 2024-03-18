import getConfig from 'next/config';
import { formatQuery } from './formatting';

type ApiParams = Record<string, any>;

const { publicRuntimeConfig } = getConfig();

const authHeader = (headers: Record<string, string> = {}): Record<string, string> => {
    const token = window.localStorage.getItem('token');
    if (token) headers['Authorization'] = `Basic ${token}`;
    return headers;
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
        headers: authHeader({ 'Client-Id': 'tomlin-web' }),
        mode: 'cors',
    })
        .then((response: Response): Promise<Response> => {
            if (!response.ok) throw new Error(`Error (${response.status}) while fetching data from API.`);
            return Promise.resolve(response);
        })
        .then((response: Response): Promise<T> => (type == 'text' ? response.text() : type == 'blob' ? response.blob() : response.json()));

export const get = <T>(path: string, params?: ApiParams): Promise<T> => api<T>('GET', path + formatQuery(params));

export const query = <T>([path, params]: [string, ApiParams]): Promise<T> => api<T>('GET', path + formatQuery(params));

export const post = <T>(path: string, params?: ApiParams, files?: FormData): Promise<T> => api<T>('POST', path, buildForm(params, files));

export const del = <T>(path: string, params?: ApiParams): Promise<T> => api<T>('DELETE', path, buildForm(params));

export const auth = <T>(path: string): Promise<T> => api<T>('POST', path, buildForm({ referrer: document.referrer }));

export const text = (path: string, params?: ApiParams): Promise<string> => api('POST', path, buildForm(params), 'text');

export const blob = (path: string, params?: ApiParams): Promise<Blob> => api('POST', path, buildForm(params), 'blob');
