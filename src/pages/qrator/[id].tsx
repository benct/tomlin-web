import type { GetServerSideProps, NextPage } from 'next';
import { QRatorItem } from '@/components/qrator/QRatorItem';

interface QRatorItemProps {
    id: number;
}

const QRatorItemPage: NextPage<QRatorItemProps> = ({ id }: QRatorItemProps) => <QRatorItem id={id} />;

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({ props: { title: 'QRator', standalone: true, id: query.id } });

export default QRatorItemPage;
