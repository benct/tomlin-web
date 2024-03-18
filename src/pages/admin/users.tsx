import type { NextPage } from 'next';
import { Auth } from '@/components/Auth';
import { Default } from '@/components/page/Default';
import { Users } from '@/components/admin/users/Users';

const UsersPage: NextPage = () => (
    <Default title="Users">
        <Auth>
            <Users />
        </Auth>
    </Default>
);

export default UsersPage;
