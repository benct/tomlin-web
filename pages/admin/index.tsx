import type { NextPage } from 'next';
import { NavigationAdmin } from '../../components/page/Navigation';
import { Auth } from '../../components/Auth';
import { Admin } from '../../components/admin/Admin';

const AdminPage: NextPage = () => (
    <Auth>
        <NavigationAdmin />
        <Admin />
    </Auth>
);

export default AdminPage;
