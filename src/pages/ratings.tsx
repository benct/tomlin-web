import type { NextPage, GetStaticProps } from 'next';
import { Auth } from '@/components/Auth';
import { Ratings } from '@/components/rating/Ratings';

const RatingsPage: NextPage = () => (
    <Auth>
        <Ratings />
    </Auth>
);

export const getStaticProps: GetStaticProps = async () => ({ props: { title: 'Ratings', standalone: false } });

export default RatingsPage;
