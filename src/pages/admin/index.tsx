import type { NextPage, GetStaticProps } from 'next';
import { Auth } from '@/components/Auth';
import { Admin } from '@/components/admin/Admin';

const AdminPage: NextPage = () => (
    <Auth>
        <Admin />
    </Auth>
);

export const getStaticProps: GetStaticProps = async () => ({ props: { title: 'Admin', standalone: false } });

export default AdminPage;
