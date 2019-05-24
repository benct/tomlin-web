import { _post } from './api';

export default {
    init(): void {
        this._authenticate({ service: 'auth', action: 'validate', referrer: document.referrer });
    },

    login(email: string | null, password: string | null, cb: (loggedIn: boolean) => void): void {
        this._authenticate({ service: 'auth', action: 'login', user: email, pass: password }, cb);
    },

    getToken(): string {
        return localStorage.token;
    },

    logout(): void {
        delete localStorage.token;
        this.onChange(false);
    },

    loggedIn(): boolean {
        return !!localStorage.token;
    },

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChange(isLoggedIn: boolean): void {},

    _authenticate(data = {}, cb?: (loggedIn: boolean) => void): void {
        _post<string>(data)
            .then((response: string): Promise<string> => (response ? Promise.resolve(response) : Promise.reject()))
            .then(
                (token: string): void => {
                    localStorage.token = token;
                    if (cb) cb(true);
                    this.onChange(true);
                }
            )
            .catch(
                (): void => {
                    delete localStorage.token;
                    if (cb) cb(false);
                    this.onChange(false);
                }
            );
    },
};
