import React from 'react';

import auth from '../lib/auth.js';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        const user = this.refs.username.value;
        const pass = this.refs.password.value;

        auth.login(user, pass, (loggedIn) => {
            if (!loggedIn) {
                return this.setState({error: true});
            }

            if (this.props.location.state && this.props.location.state.nextPathname) {
                this.props.router.replace(this.props.location.state.nextPathname);
            } else {
                this.props.router.replace('/');
            }
            this.refs.form.style.display = 'none';
        });
    }

    render() {
        return (
            <form ref="form" onSubmit={this.handleSubmit.bind(this)}>
                <input tabIndex="2" type="text" ref="username" placeholder="username" autoComplete="off"/>
                <input tabIndex="3" type="password" ref="password" placeholder="********"/>
                <input tabIndex="4" type="submit" value="login" />
                {this.state.error && (<p tabIndex="1" className="text error">Incorrect username or password...</p>)}
            </form>
        );
    }
}