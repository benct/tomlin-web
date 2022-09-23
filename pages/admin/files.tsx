import type { NextPage } from 'next';
import { NavigationAdmin } from '../../components/page/Navigation';
import { Auth } from '../../components/Auth';
import { Files } from '../../components/files/Files';

const FilesPage: NextPage = () => (
    <Auth>
        <NavigationAdmin />
        <Files />
    </Auth>
);

export default FilesPage;
