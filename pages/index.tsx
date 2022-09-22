import type { GetStaticProps, NextPage } from 'next';
import { Home } from '../components/home/Home';

const HomePage: NextPage = () => <Home />;

export const getStaticProps: GetStaticProps = async () => ({ props: { standalone: false } });

export default HomePage;
