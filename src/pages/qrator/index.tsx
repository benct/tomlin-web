import type { NextPage } from 'next';
import { Standalone } from '@/components/page/Standalone';
import { QRator } from '@/components/qrator/QRator';

const QRatorPage: NextPage = () => (
    <Standalone title="QRator">
        <QRator />
    </Standalone>
);

export default QRatorPage;
