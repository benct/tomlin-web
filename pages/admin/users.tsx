import type { NextPage, GetStaticProps } from 'next';
import { NavigationAdmin } from '../../components/page/Navigation';
import { Auth } from '../../components/Auth';
import { Users } from '../../components/users/Users';

const UsersPage: NextPage = () => (
    <Auth>
        <NavigationAdmin />
        <Users />
    </Auth>
);

export const getStaticProps: GetStaticProps = async () => ({ props: { title: 'Users', standalone: false } });

export default UsersPage;
