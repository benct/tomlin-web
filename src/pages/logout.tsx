import type { NextPage, GetStaticProps } from 'next';
import { useEffect } from 'react';
import { Icon } from '@mdi/react';
import { mdiExitRun } from '@mdi/js';

import { useLogout } from '@/data/auth';
import { Box } from '@/components/page/Box';

const LogoutPage: NextPage = () => {
    const logout = useLogout();

    useEffect(() => {
        logout();
    }, [logout]);

    return (
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
    );
};

export const getStaticProps: GetStaticProps = async () => ({ props: { title: 'Logout', standalone: false } });

export default LogoutPage;
