import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Icon } from '@mdi/react';
import { mdiExitRun } from '@mdi/js';

import { logout } from '../actions/auth';

export const Logout: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(logout());

        window.setTimeout((): void => history.push('/'), 3000);
    }, []);

    return (
        <div className="wrapper min-height text">
            <div>You have been logged out...</div>
            <Icon path={mdiExitRun} size="150px" title="Logging out!" className="mvl" />
            <div>Bye bye!</div>
        </div>
    );
};
