import type { GetServerSideProps, NextPage } from 'next';
import { Standalone } from '@/components/page/Standalone';
import { QRatorItem } from '@/components/qrator/QRatorItem';

interface QRatorItemProps {
    id: number;
}

const QRatorItemPage: NextPage<QRatorItemProps> = ({ id }: QRatorItemProps) => (
    <Standalone title="QRator">
        <QRatorItem id={id} />
    </Standalone>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({ props: { id: query.id } });

export default QRatorItemPage;
