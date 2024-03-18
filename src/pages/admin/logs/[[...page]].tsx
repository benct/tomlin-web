import type { GetServerSideProps, NextPage } from 'next';
import { Auth } from '@/components/Auth';
import { Default } from '@/components/page/Default';
import { Logs } from '@/components/admin/Logs';
import { PageProps } from '@/interfaces';

const LogsPage: NextPage<PageProps> = ({ page: number }: PageProps) => (
    <Default title="Logs">
        <Auth>
            <Logs page={number} />
        </Auth>
    </Default>
);

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ query }) => ({
    props: { page: Number(query.page?.[0] ?? 1) },
});

export default LogsPage;
