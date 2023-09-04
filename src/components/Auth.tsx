import { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '@/data/context';
import { Loading } from './page/Loading';
import { Login } from './Login';

type AuthProps = {
    role?: string;
};

export const Auth = ({ role = 'admin', children }: PropsWithChildren<AuthProps>) => {
    const router = useRouter();
    const { isLoggedIn, hasPermission } = useAppContext();

    return (
        <Loading isLoading={isLoggedIn === null} className="bg-light dark:bg-dark">
            {hasPermission(role) ? children : <Login redirectTo={{ pathname: router.pathname, query: router.query }} />}
        </Loading>
    );
};
