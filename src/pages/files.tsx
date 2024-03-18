import type { NextPage } from 'next';
import { Auth } from '@/components/Auth';
import { Default } from '@/components/page/Default';
import { Files } from '@/components/files/Files';

const FilesPage: NextPage = () => (
    <Default title="Files">
        <Auth role="private">
            <Files />
        </Auth>
    </Default>
);

export default FilesPage;
