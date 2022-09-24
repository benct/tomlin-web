import type { NextPage, GetStaticProps } from 'next';
import { NavigationAdmin } from '../../../components/page/Navigation';
import { Auth } from '../../../components/Auth';
import { Visits } from '../../../components/admin/Visits';

const LogsPage: NextPage = () => (
    <Auth>
        <NavigationAdmin />
        <Visits />
    </Auth>
);

// TODO SSR (getServerSideProps)
export const getStaticPaths = async () => ({
    paths: [{ params: { page: [] } }],
    fallback: 'blocking',
});

export const getStaticProps: GetStaticProps = async () => ({ props: { title: 'Visits', standalone: false } });

export default LogsPage;
