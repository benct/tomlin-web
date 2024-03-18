import type { GetServerSideProps, NextPage } from 'next';
import { Auth } from '@/components/Auth';
import { Default } from '@/components/page/Default';
import { Visits } from '@/components/admin/Visits';
import { PageProps } from '@/interfaces';

const VisitsPage: NextPage<PageProps> = ({ page }: PageProps) => (
    <Default title="Visits">
        <Auth>
            <Visits page={page} />
        </Auth>
    </Default>
);

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ query }) => ({
    props: { page: Number(query.page?.[0] ?? 1) },
});

export default VisitsPage;
