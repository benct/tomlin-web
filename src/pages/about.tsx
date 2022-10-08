import type { GetStaticProps, NextPage } from 'next';
import { About } from '../components/about/About';

const AboutPage: NextPage = () => <About />;

export const getStaticProps: GetStaticProps = async () => ({ props: { title: 'About', standalone: false } });

export default AboutPage;
