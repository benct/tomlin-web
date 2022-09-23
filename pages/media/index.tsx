import type { GetStaticProps, NextPage } from 'next';
import { NavigationMedia } from '../../components/page/Navigation';
import { MediaStats } from '../../components/media/MediaStats';

const MediaPage: NextPage = () => (
    <>
        <NavigationMedia />
        <MediaStats />
    </>
);

export const getStaticProps: GetStaticProps = async () => ({ props: { standalone: false } });

export default MediaPage;
