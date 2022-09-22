import type { GetStaticProps, NextPage } from 'next';
import { Home } from '../components/home/Home';

const HomePage: NextPage = () => <Home />;

export const getStaticProps: GetStaticProps = () => ({ props: { standalone: false } });

export default HomePage;
