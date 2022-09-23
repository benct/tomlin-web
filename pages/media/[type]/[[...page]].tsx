import type { GetStaticProps, NextPage } from 'next';
import { Auth } from '../../../components/Auth';
import { NavigationMedia } from '../../../components/page/Navigation';
import { MediaList } from '../../../components/media/MediaList';
import { MediaType } from '../../../interfaces';

const MediaListPage: NextPage<{ type: MediaType; page: number }> = ({ type, page }) => (
    <Auth>
        <NavigationMedia />
        <MediaList type={type} page={page} />
    </Auth>
);

// TODO SSR (getServerSideProps)
export const getStaticPaths = async () => ({
    paths: [{ params: { type: 'movie', page: [] } }, { params: { type: 'tv', page: [] } }, { params: { type: 'watchlist', page: [] } }],
    fallback: 'blocking',
});

export const getStaticProps: GetStaticProps = async (context) => {
    const type = context.params?.type?.toString() ?? 'invalid';
    return {
        notFound: !['movie', 'tv', 'watchlist'].includes(type),
        props: { type: context.params?.type, page: context.params?.page?.[0] ?? 1 },
    };
};

export default MediaListPage;
