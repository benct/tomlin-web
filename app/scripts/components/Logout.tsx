import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import auth from '../util/auth';

class Logout extends React.PureComponent<RouteComponentProps> {
    componentDidMount(): void {
        auth.logout();

        window.setTimeout((): void => this.props.history.push('/'), 3000);
    }

    render(): React.ReactElement {
        return <div className="wrapper text">You have been logged out!</div>;
    }
}

export default withRouter(Logout);
