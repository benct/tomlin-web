import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { AuthState, DefaultState, ThunkDispatchProp } from '../interfaces';
import { login } from '../actions/auth';

import Loading from './page/Loading';

type LoginProps = RouteComponentProps & AuthState & ThunkDispatchProp;

class Login extends React.PureComponent<LoginProps> {
    username: React.RefObject<HTMLInputElement>;
    password: React.RefObject<HTMLInputElement>;

    constructor(props: LoginProps) {
        super(props);

        this.username = React.createRef();
        this.password = React.createRef();
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        const user = (this.username.current && this.username.current.value) || '';
        const pass = (this.password.current && this.password.current.value) || '';

        this.props.dispatch(login({ user, pass }));
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
                <form className="mha" onSubmit={this.handleSubmit.bind(this)} style={{ maxWidth: '300px' }}>
                    <input type="email" ref={this.username} placeholder="e-mail" aria-label="E-mail" autoComplete="off" className="input" />
                    <input type="password" ref={this.password} placeholder="********" aria-label="Password" className="input" />
                    <input type="submit" value="login" aria-label="Login" className="input" />
                    {this.props.error && <p className="text error">Incorrect username or password...</p>}
                    <Loading isLoading={this.props.loading} text="Logging in..." />
                </form>
            </div>
        );
    }
}

export default connect((state: DefaultState): AuthState => ({ ...state.auth }))(Login);
