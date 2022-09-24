import type { GetStaticProps, NextPage } from 'next';
import { Auth } from '../../../components/Auth';
import { NavigationMedia } from '../../../components/page/Navigation';
import { MediaSearch } from '../../../components/media/MediaSearch';

const MediaSearchPage: NextPage = () => (
    <Auth>
        <NavigationMedia />
        <MediaSearch />
    </Auth>
);

// TODO SSR (getServerSideProps)
export const getStaticPaths = async () => ({
    paths: [{ params: { params: [] } }],
    fallback: 'blocking',
});

export const getStaticProps: GetStaticProps = async () => ({ props: { title: 'Media', standalone: false } });

export default MediaSearchPage;
