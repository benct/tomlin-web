import { FC, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '@/data/context';
import { Loading } from './page/Loading';
import { Login } from './Login';

type AuthProps = {
    children: ReactNode;
};

export const Auth: FC<AuthProps> = ({ children }) => {
    const router = useRouter();
    const { isLoggedIn } = useAppContext();

    return (
        <Loading isLoading={isLoggedIn === null} className="bg-light dark:bg-dark">
            {isLoggedIn ? children : <Login redirectTo={{ pathname: router.pathname, query: router.query }} />}
        </Loading>
    );
};
