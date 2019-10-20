import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { AuthState, DefaultState, ThunkDispatchProp } from '../interfaces';
import { login } from '../actions/auth';

import Loading from './page/Loading';

type LoginProps = RouteComponentProps & AuthState & ThunkDispatchProp;

const Login: React.FC<LoginProps> = ({ loading, redirect, error, location, dispatch }) => {
    const username = React.createRef<HTMLInputElement>();
    const password = React.createRef<HTMLInputElement>();

    const { from } = location.state || { from: { pathname: '/' } };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const user = (username.current && username.current.value) || '';
        const pass = (password.current && password.current.value) || '';

        dispatch(login({ user, pass }));
    };

    return redirect ? (
        <Redirect to={from} />
    ) : (
        <div className="wrapper text">
            {location.state ? (
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

export default connect((state: DefaultState): AuthState => ({ ...state.auth }))(Login);
