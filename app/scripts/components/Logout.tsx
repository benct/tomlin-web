import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ThunkDispatchProp } from '../interfaces';
import { logout } from '../actions/auth';

const Logout: React.FC<ThunkDispatchProp> = ({ dispatch }) => {
    const history = useHistory();

    React.useEffect(() => {
        dispatch(logout());

        window.setTimeout((): void => history.push('/'), 3000);
    }, []);

    return (
        <div className="wrapper min-height text">
            <div>You have been logged out...</div>
            <img src={require('../../images/icon/exit.svg')} alt="Exit" style={{ width: '200px' }} />
            <div>Bye bye!</div>
        </div>
    );
};

export default connect()(Logout);
