import type { NextPage } from 'next';
import { useEffect } from 'react';
import { Icon } from '@mdi/react';
import { mdiExitRun } from '@mdi/js';

import { useLogout } from '@/data/auth';
import { Default } from '@/components/page/Default';
import { Box } from '@/components/page/Box';

const LogoutPage: NextPage = () => {
    const logout = useLogout();

    useEffect(() => {
        logout();
    }, [logout]);

    return (
        <Default title="Logout">
            <Box title="Logout" className="text-center">
                <div>You have been logged out...</div>
                <Icon
                    path={mdiExitRun}
                    size="100px"
                    title="Logging out!"
                    className="my-32 mx-auto text-neutral dark:text-neutral-dark"
                    id="exit-icon"
                />
                <div>Bye bye!</div>
            </Box>
        </Default>
    );
};

export default LogoutPage;
