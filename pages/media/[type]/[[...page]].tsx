import type { GetServerSideProps, NextPage } from 'next';
import { Auth } from '../../../components/Auth';
import { NavigationMedia } from '../../../components/page/Navigation';
import { MediaList } from '../../../components/media/MediaList';
import { MediaProps, MediaType, NextPageProps } from '../../../interfaces';

const MediaListPage: NextPage<MediaProps> = ({ type, page, sort, query }) => (
    <Auth>
        <NavigationMedia />
        <MediaList type={type} page={page} sort={sort} query={query} />
    </Auth>
);

export const getServerSideProps: GetServerSideProps<NextPageProps & MediaProps> = async ({ query }) => {
    const type = query.type?.toString() ?? 'invalid';

    return {
        notFound: !['movie', 'tv', 'watchlist'].includes(type),
        props: {
            title: 'Media Lists',
            standalone: false,
            type: type as MediaType,
            page: Number(query.page?.[0] ?? 1),
            sort: query.sort?.toString() ?? 'rating-desc',
            query: query.query?.toString() ?? null,
        },
    };
};

export default MediaListPage;
