import type { GetStaticProps, NextPage } from 'next';
import { Finn } from '../components/finn/Finn';

const FinnPage: NextPage = () => <Finn />;

export const getStaticProps: GetStaticProps = async () => ({ props: { standalone: false } });

export default FinnPage;
