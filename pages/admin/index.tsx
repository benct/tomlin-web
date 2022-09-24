import type { NextPage, GetStaticProps } from 'next';
import { NavigationAdmin } from '../../components/page/Navigation';
import { Auth } from '../../components/Auth';
import { Admin } from '../../components/admin/Admin';

const AdminPage: NextPage = () => (
    <Auth>
        <NavigationAdmin />
        <Admin />
    </Auth>
);

export const getStaticProps: GetStaticProps = async () => ({ props: { title: 'Admin', standalone: false } });

export default AdminPage;
