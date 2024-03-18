import type { NextPage } from 'next';
import { Auth } from '@/components/Auth';
import { Default } from '@/components/page/Default';
import { Ratings } from '@/components/rating/Ratings';

const RatingsPage: NextPage = () => (
    <Default title="Ratings">
        <Auth role="rating">
            <Ratings />
        </Auth>
    </Default>
);

export default RatingsPage;
