import type { NextPage } from 'next';
import { Auth } from '@/components/Auth';
import { Default } from '@/components/page/Default';
import { Finn } from '@/components/finn/Finn';

const FinnPage: NextPage = () => (
    <Default title="FINN">
        <Auth role="private">
            <Finn />
        </Auth>
    </Default>
);

export default FinnPage;
