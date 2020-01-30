import React from 'react';
import { connect } from 'react-redux';
import { StaticContext } from 'react-router';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { AuthState, DefaultState, ThunkDispatchProp } from '../interfaces';
import { login } from '../actions/auth';

import Loading from './page/Loading';

type LoginProps = RouteComponentProps<{}, StaticContext, { from: { pathname: string } }> & AuthState & ThunkDispatchProp;

const Login: React.FC<LoginProps> = ({ loading, redirect, error, location, dispatch }) => {
    const username = React.useRef<HTMLInputElement>(null);
    const password = React.useRef<HTMLInputElement>(null);

    const { from } = location.state ?? { from: { pathname: '/' } };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        dispatch(login(username.current && username.current.value, password.current && password.current.value));
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
