import type { NextPage } from 'next';
import { Auth } from '@/components/Auth';
import { Default } from '@/components/page/Default';
import { Admin } from '@/components/admin/Admin';

const AdminPage: NextPage = () => (
    <Default title="Admin">
        <Auth>
            <Admin />
        </Auth>
    </Default>
);

export default AdminPage;
