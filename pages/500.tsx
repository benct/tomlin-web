import type { NextPage, GetStaticProps } from 'next';

const ServerError: NextPage = () => (
    <div className="wrapper error-page">
        <h1 className="color-primary">Internal Server Error</h1>
        <p>Shit&apos;s gone down...</p>
    </div>
);

export const getStaticProps: GetStaticProps = async () => ({ props: { title: 'Internal Server Error', standalone: false } });

export default ServerError;
