import { FC, FormEvent, useRef } from 'react';
import { UrlObject } from 'url';

import { useLogin } from '../data/auth';
import { Loading } from './page/Loading';

export const Login: FC<{ redirectTo?: string | UrlObject }> = ({ redirectTo }) => {
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const { login, loading, error } = useLogin(redirectTo);

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        login(username.current?.value, password.current?.value);
    };

    return (
        <div className="wrapper text">
            {redirectTo ? (
                <div className="mbl">Sorry, you need to log in to view this page.</div>
            ) : (
                <div className="mbl">Fill out the form below to log in.</div>
            )}
            <form className="mha" onSubmit={handleSubmit} style={{ maxWidth: '300px' }}>
                <input type="email" ref={username} placeholder="e-mail" aria-label="E-mail" autoComplete="off" className="input" />
                <input type="password" ref={password} placeholder="********" aria-label="Password" className="input" />
                <input type="submit" value="login" aria-label="Login" className="input" />
                {error && <p className="text error">Incorrect username or password...</p>}
                <Loading isLoading={loading} text="Logging in..." />
            </form>
        </div>
    );
};
