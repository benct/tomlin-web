import type { NextPage } from 'next';
import { Default } from '@/components/page/Default';
import { Been } from '@/components/been/Been';

const BeenPage: NextPage = () => (
    <Default title="Been">
        <Been />
    </Default>
);

export default BeenPage;
