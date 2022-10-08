import type { GetStaticProps, NextPage } from 'next';
import { Finn } from '@/components/finn/Finn';

const FinnPage: NextPage = () => <Finn />;

export const getStaticProps: GetStaticProps = async () => ({ props: { title: 'FINN', standalone: false } });

export default FinnPage;
