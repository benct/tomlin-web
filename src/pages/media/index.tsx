import type { GetStaticProps, NextPage } from 'next';
import { MediaStats } from '../../components/media/MediaStats';

const MediaPage: NextPage = () => (
    <>
        <MediaStats />
    </>
);

export const getStaticProps: GetStaticProps = async () => ({ props: { title: 'Media', standalone: false } });

export default MediaPage;
