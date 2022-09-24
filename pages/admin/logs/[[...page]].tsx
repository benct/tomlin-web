import type { NextPage, GetStaticProps } from 'next';
import { NavigationAdmin } from '../../../components/page/Navigation';
import { Auth } from '../../../components/Auth';
import { Logs } from '../../../components/admin/Logs';

const LogsPage: NextPage = () => (
    <Auth>
        <NavigationAdmin />
        <Logs />
    </Auth>
);

// TODO SSR (getServerSideProps)
export const getStaticPaths = async () => ({
    paths: [{ params: { page: [] } }],
    fallback: 'blocking',
});

export const getStaticProps: GetStaticProps = async () => ({ props: { title: 'Logs', standalone: false } });

export default LogsPage;
