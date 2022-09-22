import type { GetStaticProps, NextPage } from 'next';
import { Login } from '../components/Login';

const LoginPage: NextPage = () => <Login />;

export const getStaticProps: GetStaticProps = async () => ({ props: { standalone: false } });

export default LoginPage;
