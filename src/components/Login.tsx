import { FC, FormEvent, useRef } from 'react';
import { UrlObject } from 'url';

import { useLogin } from '@/data/auth';

import { Box } from './page/Box';
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
        <Box title="Login">
            <div className="text-center mb-24">
                {redirectTo ? 'Sorry, you need to log in to view this page.' : 'Please fill out the form below to log in.'}
            </div>
            <form className="mx-auto max-w-max space-y-16" onSubmit={handleSubmit}>
                <input type="email" ref={username} placeholder="E-mail" aria-label="E-mail" autoComplete="off" className="input mx-auto" />
                <input type="password" ref={password} placeholder="********" aria-label="Password" className="input mx-auto" />
                <input type="submit" value="Submit" aria-label="Login" className="input mx-auto" />
                {error && <p className="text-warn">Incorrect username or password!</p>}
                <Loading isLoading={loading} text="Logging in..." />
            </form>
        </Box>
    );
};
