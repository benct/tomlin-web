import type { NextPage } from 'next';
import { NavigationAdmin } from '../../../components/page/Navigation';
import { Auth } from '../../../components/Auth';
import { Logs } from '../../../components/admin/Logs';

const LogsPage: NextPage = () => (
    <Auth>
        <NavigationAdmin />
        <Logs />
    </Auth>
);

export default LogsPage;
