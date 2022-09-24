import type { NextPage, GetStaticProps } from 'next';

const NotFound: NextPage = () => (
    <div className="wrapper error-page">
        <h1 className="color-primary">Page Not Found</h1>
        <p>Sorry, but the page you are trying to view does not exist.</p>
    </div>
);

export const getStaticProps: GetStaticProps = async () => ({ props: { title: 'Page Not Found', standalone: false } });

export default NotFound;
