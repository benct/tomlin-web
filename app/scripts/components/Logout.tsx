import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logout } from '../actions/auth';

export const Logout: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
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
