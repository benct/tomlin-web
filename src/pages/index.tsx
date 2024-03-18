import type { NextPage } from 'next';
import { Default } from '@/components/page/Default';
import { Home } from '@/components/home/Home';

const HomePage: NextPage = () => (
    <Default title="Home">
        <Home />
    </Default>
);

export default HomePage;
