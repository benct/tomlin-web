import type { NextPage } from 'next';
import { Default } from '@/components/page/Default';
import { MediaStats } from '@/components/media/MediaStats';

const MediaPage: NextPage = () => (
    <Default title="Media">
        <MediaStats />
    </Default>
);

export default MediaPage;
