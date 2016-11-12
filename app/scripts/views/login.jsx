import React from 'react';

import auth from '../authentication/auth.js';

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
            <form onSubmit={this.handleSubmit.bind(this)} ref="form">
                <label><input ref="username" placeholder="username" /></label><br/>
                <label><input ref="password" placeholder="password" /></label><br/>
                <button type="submit">login</button>
                {this.state.error && (<p className="text">Incorrect username or password...</p>)}
            </form>
        );
    }
}