import type { GetServerSideProps, NextPage } from 'next';
import { Auth } from '../../../components/Auth';
import { Logs } from '../../../components/admin/Logs';
import { NextPageProps, PageProps } from '../../../interfaces';

const LogsPage: NextPage<PageProps> = ({ page: number }) => (
    <Auth>
        <Logs page={number} />
    </Auth>
);

export const getServerSideProps: GetServerSideProps<NextPageProps & PageProps> = async ({ query }) => ({
    props: {
        title: 'Logs',
        standalone: false,
        page: Number(query.page?.[0] ?? 1),
    },
});

export default LogsPage;
