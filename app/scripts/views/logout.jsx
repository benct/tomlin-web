import React from 'react';

import auth from '../authentication/auth.js';

export default class Logout extends React.Component {
    componentDidMount() {
        auth.logout();
    }

    render() {
        return <div className="text">You are logged out!</div>
    }
}