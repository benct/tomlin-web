import type { NextPage, GetStaticProps } from 'next';
import { Auth } from '../components/Auth';
import { Notes } from '../components/notes/Notes';

const NotesPage: NextPage = () => (
    <Auth>
        <Notes />
    </Auth>
);

export const getStaticProps: GetStaticProps = async () => ({ props: { title: 'Notes', standalone: false } });

export default NotesPage;
