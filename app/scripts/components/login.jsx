import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import auth from '../util/auth.js';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            error: false,
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        auth.login(this.username.value, this.password.value, loggedIn =>
            this.setState({
                redirectToReferrer: loggedIn,
                error: !loggedIn,
            })
        );
    }

    render() {
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
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="email" ref={input => (this.username = input)} placeholder="e-mail" autoComplete="off" />
                    <input type="password" ref={input => (this.password = input)} placeholder="********" />
                    <input type="submit" value="login" />
                    {this.state.error && <p className="text error">Incorrect username or password...</p>}
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    location: PropTypes.object.isRequired,
};
