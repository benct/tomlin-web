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
            <div className="wrapper">
                <form ref={form => (this.form = form)} onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" ref={input => (this.username = input)} placeholder="username" autoComplete="off" />
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
