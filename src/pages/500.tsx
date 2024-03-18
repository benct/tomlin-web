import type { NextPage } from 'next';
import { Default } from '@/components/page/Default';
import { Box } from '@/components/page/Box';

const ServerError: NextPage = () => (
    <Default title="Internal Server Error">
        <Box className="py-128">
            <h1 className="text-secondary dark:text-secondary-dark text-16 text-center uppercase pb-16">Internal Server Error</h1>
            <p className="text-center">Shit&apos;s gone down...</p>
        </Box>
    </Default>
);

export default ServerError;
