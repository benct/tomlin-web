import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import authActions from '../actions/auth.js';

class Logout extends React.PureComponent<RouteComponentProps & DispatchProp> {
    componentDidMount(): void {
        this.props.dispatch(authActions.logout());

        window.setTimeout((): void => this.props.history.push('/'), 3000);
    }

    render(): React.ReactElement {
        return <div className="wrapper text">You have been logged out!</div>;
    }
}

export default connect()(withRouter(Logout));
