import type { GetServerSideProps, NextPage } from 'next';
import { Auth } from '@/components/Auth';
import { Default } from '@/components/page/Default';
import { MediaSearch } from '@/components/media/MediaSearch';
import { MediaSearchProps } from '@/interfaces';

const MediaSearchPage: NextPage<MediaSearchProps> = (props) => (
    <Default title="Media Search">
        <Auth role="media">
            <MediaSearch {...props} />
        </Auth>
    </Default>
);

export const getServerSideProps: GetServerSideProps<MediaSearchProps> = async ({ query }) => {
    const [type, action, page, id] = (query.params ?? []) as string[];

    return {
        props: {
            ...(type ? { type } : {}),
            ...(action ? { action } : {}),
            ...(id ? { id } : {}),
            page: Number(page ?? 1),
        },
    };
};

export default MediaSearchPage;
