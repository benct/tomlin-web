import type { NextPage, GetServerSideProps } from 'next';
import { Auth } from '@/components/Auth';
import { MediaSearch } from '@/components/media/MediaSearch';
import { MediaSearchProps, NextPageProps } from '@/interfaces';

const MediaSearchPage: NextPage<MediaSearchProps> = (props) => (
    <Auth>
        <MediaSearch {...props} />
    </Auth>
);

export const getServerSideProps: GetServerSideProps<NextPageProps & MediaSearchProps> = async ({ query }) => {
    const [type, action, page, id] = (query.params ?? []) as string[];

    return {
        props: {
            title: `Media Search`,
            standalone: false,
            ...(type ? { type } : {}),
            ...(action ? { action } : {}),
            ...(id ? { id } : {}),
            page: Number(page ?? 1),
        },
    };
};

export default MediaSearchPage;
