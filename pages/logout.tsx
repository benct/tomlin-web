import type { GetStaticProps, NextPage } from 'next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Icon } from '@mdi/react';
import { mdiExitRun } from '@mdi/js';

import { logout } from '../actions/auth';

const LogoutPage: NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(logout());

        setTimeout((): void => {
            router.replace('/');
        }, 3000);
    }, [dispatch, router]);

    return (
        <div className="wrapper min-height text">
            <div>You have been logged out...</div>
            <Icon path={mdiExitRun} size="150px" title="Logging out!" className="mvl" id="exitIcon" />
            <div>Bye bye!</div>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => ({ props: { standalone: false } });

export default LogoutPage;
