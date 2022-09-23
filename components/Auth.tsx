import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { AuthState, DefaultState } from '../interfaces';
import { Login } from './Login';

type AuthProps = {
    children: ReactNode;
};

export const Auth: FC<AuthProps> = ({ children }) => {
    const router = useRouter();
    const isLoggedIn = useSelector<DefaultState, AuthState['isLoggedIn']>((state) => state.auth.isLoggedIn);

    return isLoggedIn ? children : <Login redirectTo={router.pathname} />;
};
