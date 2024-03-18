import type { NextPage } from 'next';
import { Default } from '@/components/page/Default';
import { Login } from '@/components/Login';

const LoginPage: NextPage = () => (
    <Default title="Login">
        <Login />
    </Default>
);

export default LoginPage;
