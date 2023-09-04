import type { GetServerSideProps, NextPage } from 'next';
import { Auth } from '@/components/Auth';
import { Visits } from '@/components/admin/Visits';
import { NextPageProps, PageProps } from '@/interfaces';

const VisitsPage: NextPage<PageProps> = ({ page }: PageProps) => (
    <Auth>
        <Visits page={page} />
    </Auth>
);

export const getServerSideProps: GetServerSideProps<NextPageProps & PageProps> = async ({ query }) => ({
    props: {
        title: 'Visits',
        standalone: false,
        page: Number(query.page?.[0] ?? 1),
    },
});

export default VisitsPage;
