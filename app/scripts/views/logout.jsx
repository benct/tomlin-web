import React from 'react';

import auth from '../lib/auth.js';

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        auth.logout();

        setTimeout(() => this.props.router.push('/'), 3000);
    }

    render() {
        return <div className="wrapper text">You have been logged out!</div>
    }
}