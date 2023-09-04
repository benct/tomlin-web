import type { GetStaticProps, NextPage } from 'next';
import { Auth } from '@/components/Auth';
import { Finn } from '@/components/finn/Finn';

const FinnPage: NextPage = () => (
    <Auth role="private">
        <Finn />
    </Auth>
);

export const getStaticProps: GetStaticProps = async () => ({ props: { title: 'FINN', standalone: false } });

export default FinnPage;
