import React from 'react';

import auth from '../authentication/auth.js';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
    }

    componentDidMount() {
        this.refs.username.focus();
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
                <input type="text" ref="username" placeholder="username" autoComplete="off"/>
                <input type="password" ref="password" placeholder="********"/>
                <input type="submit" value="login" />
                {this.state.error && (<p className="text error">Incorrect username or password...</p>)}
            </form>
        );
    }
}