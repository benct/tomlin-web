import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import auth from '../util/auth.js';

class Logout extends React.PureComponent {
    componentDidMount() {
        auth.logout();

        window.setTimeout(() => this.props.history.push('/'), 3000);
    }

    render() {
        return <div className="wrapper text">You have been logged out!</div>;
    }
}

Logout.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(Logout);
