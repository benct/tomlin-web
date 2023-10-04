import type { GetStaticProps, NextPage } from 'next';

import { Been } from '@/components/been/Been';

const BeenPage: NextPage = () => <Been />;

export const getStaticProps: GetStaticProps = async () => ({ props: { title: 'Been', standalone: false } });

export default BeenPage;
