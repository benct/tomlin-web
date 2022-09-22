import { FC, FormEvent, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { AuthState, DefaultState } from '../interfaces';
import { login } from '../actions/auth';

import { Loading } from './page/Loading';

export const Login: FC<{ redirectTo?: string }> = ({ redirectTo }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { loading, redirect, error } = useSelector<DefaultState, AuthState>((state) => state.auth);

    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (redirect) {
            router.replace(redirectTo ?? '/');
        }
    }, [router, redirect, redirectTo]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        dispatch(login(username.current?.value, password.current?.value));
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
