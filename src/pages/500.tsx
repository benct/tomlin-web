import type { NextPage, GetStaticProps } from 'next';
import { Box } from '@/components/page/Box';

const ServerError: NextPage = () => (
    <Box className="py-128">
        <h1 className="text-secondary dark:text-secondary-dark text-16 text-center uppercase pb-16">Internal Server Error</h1>
        <p className="text-center">Shit&apos;s gone down...</p>
    </Box>
);

export const getStaticProps: GetStaticProps = async () => ({ props: { title: 'Internal Server Error', standalone: false } });

export default ServerError;
