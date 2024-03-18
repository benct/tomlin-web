import type { NextPage } from 'next';
import { Auth } from '@/components/Auth';
import { Default } from '@/components/page/Default';
import { Notes } from '@/components/notes/Notes';

const NotesPage: NextPage = () => (
    <Default title="Notes">
        <Auth role="private">
            <Notes />
        </Auth>
    </Default>
);

export default NotesPage;
