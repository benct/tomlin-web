import type { NextPage } from 'next';
import { useEffect } from 'react';
import { Icon } from '@mdi/react';
import { mdiExitRun } from '@mdi/js';

import { useLogout } from '../data/auth';

const LogoutPage: NextPage = () => {
    const logout = useLogout();

    useEffect(() => {
        logout();
    }, [logout]);

    return (
        <div className="wrapper min-height text">
            <div>You have been logged out...</div>
            <Icon path={mdiExitRun} size="150px" title="Logging out!" className="mvl" id="exitIcon" />
            <div>Bye bye!</div>
        </div>
    );
};

export default LogoutPage;
