import type { NextPage } from 'next';
import { NavigationAdmin } from '../../../components/page/Navigation';
import { Auth } from '../../../components/Auth';
import { Visits } from '../../../components/admin/Visits';

const LogsPage: NextPage = () => (
    <Auth>
        <NavigationAdmin />
        <Visits />
    </Auth>
);

export default LogsPage;
