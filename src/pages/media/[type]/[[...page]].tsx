import type { GetServerSideProps, NextPage } from 'next';
import { Auth } from '@/components/Auth';
import { Default } from '@/components/page/Default';
import { MediaList } from '@/components/media/MediaList';
import { MediaProps, MediaType } from '@/interfaces';

const MediaListPage: NextPage<MediaProps> = ({ type, page, sort, query }: MediaProps) => (
    <Default title="Media Lists">
        <Auth role="media">
            <MediaList type={type} page={page} sort={sort} query={query} />
        </Auth>
    </Default>
);

export const getServerSideProps: GetServerSideProps<MediaProps> = async ({ query }) => {
    const type = query.type?.toString() ?? 'invalid';

    return {
        notFound: !['movie', 'tv', 'watchlist'].includes(type),
        props: {
            type: type as MediaType,
            page: Number(query.page?.[0] ?? 1),
            sort: query.sort?.toString() ?? 'rating-desc',
            query: query.query?.toString() ?? null,
        },
    };
};

export default MediaListPage;
