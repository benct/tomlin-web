import type { NextPage, GetStaticProps } from 'next';
import { Auth } from '@/components/Auth';
import { Ratings } from '@/components/admin/rating/Ratings';

const RatingsPage: NextPage = () => (
    <Auth>
        <Ratings />
    </Auth>
);

export const getStaticProps: GetStaticProps = async () => ({ props: { title: 'Rating', standalone: false } });

export default RatingsPage;
