import type { NextPage, GetStaticProps } from 'next';
import { Auth } from '@/components/Auth';
import { Users } from '@/components/admin/users/Users';

const UsersPage: NextPage = () => (
    <Auth>
        <Users />
    </Auth>
);

export const getStaticProps: GetStaticProps = async () => ({ props: { title: 'Users', standalone: false } });

export default UsersPage;
