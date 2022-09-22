import type { GetStaticProps, NextPage } from 'next';
import { About } from '../components/about/About';

const AboutPage: NextPage = () => <About />;

export const getStaticProps: GetStaticProps = async () => ({ props: { standalone: false } });

export default AboutPage;
