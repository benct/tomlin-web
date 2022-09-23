import type { NextPage } from 'next';
import { NavigationAdmin } from '../../components/page/Navigation';
import { Auth } from '../../components/Auth';
import { Notes } from '../../components/notes/Notes';

const FlightsPage: NextPage = () => (
    <Auth>
        <NavigationAdmin />
        <Notes />
    </Auth>
);

export default FlightsPage;
