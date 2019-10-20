import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ThunkDispatchProp } from '../interfaces';
import { logout } from '../actions/auth';

const Logout: React.FC<RouteComponentProps & ThunkDispatchProp> = ({ history, dispatch }) => {
    React.useEffect(() => {
        dispatch(logout());

        window.setTimeout((): void => history.push('/'), 3000);
    }, []);

    return <div className="wrapper text">You have been logged out!</div>;
};

export default connect()(withRouter(Logout));
