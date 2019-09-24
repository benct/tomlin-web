import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ThunkDispatchProp } from '../interfaces';
import { logout } from '../actions/auth';

class Logout extends React.PureComponent<RouteComponentProps & ThunkDispatchProp> {
    componentDidMount(): void {
        this.props.dispatch(logout());

        window.setTimeout((): void => this.props.history.push('/'), 3000);
    }

    render(): React.ReactElement {
        return <div className="wrapper text">You have been logged out!</div>;
    }
}

export default connect()(withRouter(Logout));
