import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { AuthState, DefaultState } from '../interfaces';

import authActions from '../actions/auth.js';

class Login extends React.PureComponent<RouteComponentProps & AuthState & DispatchProp> {
    username: React.RefObject<HTMLInputElement>;
    password: React.RefObject<HTMLInputElement>;

    constructor(props: RouteComponentProps & AuthState & DispatchProp) {
        super(props);

        this.username = React.createRef();
        this.password = React.createRef();
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        const user = (this.username.current && this.username.current.value) || '';
        const pass = (this.password.current && this.password.current.value) || '';

        this.props.dispatch(authActions.authenticate({ action: 'login', user, pass }));
    }

    render(): React.ReactNode {
        const { from } = this.props.location.state || { from: { pathname: '/' } };

        return this.props.redirect ? (
            <Redirect to={from} />
        ) : (
            <div className="wrapper text">
                {this.props.location.state ? (
                    <div className="mbl">Sorry, you need to log in to view this page.</div>
                ) : (
                    <div className="mbl">Fill out the form below to log in.</div>
                )}
                <form className="login" onSubmit={this.handleSubmit.bind(this)}>
                    <input type="email" ref={this.username} placeholder="e-mail" aria-label="E-mail" autoComplete="off" />
                    <input type="password" ref={this.password} placeholder="********" aria-label="Password" />
                    <input type="submit" value="login" aria-label="Login" />
                    {this.props.error && <p className="text error">Incorrect username or password...</p>}
                    {this.props.loading && <p className="text">Logging in...</p>}
                </form>
            </div>
        );
    }
}

export default connect((state: DefaultState): AuthState => ({ ...state.auth }))(Login);
