import type { NextPage } from 'next';
import { Default } from '@/components/page/Default';
import { Box } from '@/components/page/Box';

const NotFound: NextPage = () => (
    <Default title="Page Not Found">
        <Box className="py-128">
            <h1 className="text-secondary dark:text-secondary-dark text-16 text-center uppercase pb-16">Page Not Found</h1>
            <p className="text-center">Sorry, but the page you are trying to view does not exist.</p>
        </Box>
    </Default>
);

export default NotFound;
