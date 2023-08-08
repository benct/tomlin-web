import type { GetServerSideProps, NextPage } from 'next';
import { QRatorItem } from '@/components/qrator/QRatorItem';

const QRatorItemPage: NextPage<{ id: number }> = ({ id }) => <QRatorItem id={id} />;

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({ props: { title: 'QRator', standalone: true, id: query.id } });

export default QRatorItemPage;
