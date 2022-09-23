import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { AuthState, DefaultState } from '../interfaces';
import { Login } from './Login';
import { Loading } from './page/Loading';

type AuthProps = {
    children: ReactNode;
};

export const Auth: FC<AuthProps> = ({ children }) => {
    const router = useRouter();

    const { isLoggedIn, loading } = useSelector<DefaultState, Pick<AuthState, 'isLoggedIn' | 'loading'>>((state) => ({
        isLoggedIn: state.auth.isLoggedIn,
        loading: state.auth.loading,
    }));

    return <Loading isLoading={loading}>{isLoggedIn ? children : <Login redirectTo={router.pathname} />}</Loading>;
};
