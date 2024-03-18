import type { NextPage } from 'next';
import { Default } from '@/components/page/Default';
import { About } from '@/components/about/About';

const AboutPage: NextPage = () => (
    <Default title="About">
        <About />
    </Default>
);

export default AboutPage;
