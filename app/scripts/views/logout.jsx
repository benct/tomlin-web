import React from 'react';

import auth from '../authentication/auth.js';

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        auth.logout();
    }

    render() {
        return <div className="text">You have been logged out!</div>
    }
}