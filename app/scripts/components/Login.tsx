import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import auth from '../util/auth.js';

interface LoginState {
    redirectToReferrer: boolean;
    error: boolean;
    loading: boolean;
}

export default class Login extends React.PureComponent<RouteComponentProps, LoginState> {
    username: React.RefObject<HTMLInputElement>;
    password: React.RefObject<HTMLInputElement>;

    constructor(props: RouteComponentProps) {
        super(props);

        this.username = React.createRef();
        this.password = React.createRef();

        this.state = {
            redirectToReferrer: false,
            error: false,
            loading: false,
        };
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        this.setState(
            { loading: true },
            (): void =>
                auth.login(
                    this.username.current && this.username.current.value,
                    this.password.current && this.password.current.value,
                    (loggedIn: boolean): void =>
                        this.setState({
                            redirectToReferrer: loggedIn,
                            error: !loggedIn,
                            loading: false,
                        })
                )
        );
    }

    render(): React.ReactNode {
        const { from } = this.props.location.state || { from: { pathname: '/' } };

        return this.state.redirectToReferrer ? (
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
                    {this.state.error && <p className="text error">Incorrect username or password...</p>}
                    {this.state.loading && <p className="text">Logging in...</p>}
                </form>
            </div>
        );
    }
}
