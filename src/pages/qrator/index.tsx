import type { GetStaticProps, NextPage } from 'next';
import { QRator } from '@/components/qrator/QRator';

const QRatorPage: NextPage = () => <QRator />;

export const getStaticProps: GetStaticProps = async () => ({ props: { title: 'QRator', standalone: true } });

export default QRatorPage;
