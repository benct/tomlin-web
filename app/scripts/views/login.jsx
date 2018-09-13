import React from 'react';
import PropTypes from 'prop-types';

import auth from '../lib/auth.js';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        auth.login(this.username.value, this.password.value, loggedIn => {
            if (!loggedIn) {
                return this.setState({ error: true });
            }

            if (this.props.location.state && this.props.location.state.nextPathname) {
                this.props.router.replace(this.props.location.state.nextPathname);
            } else {
                this.props.router.replace('/');
            }
            this.form.style.display = 'none';
        });
    }

    render() {
        return (
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
    router: PropTypes.object.isRequired,
};
