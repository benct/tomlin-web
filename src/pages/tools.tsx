import type { NextPage } from 'next';
import { Default } from '@/components/page/Default';
import { QRCode } from '@/components/tools/QRCode';
import { Encoder } from '@/components/tools/Encoder';
import { IataSearch } from '@/components/tools/IataSearch';

const ToolsPage: NextPage = () => (
    <Default title="Tools">
        <QRCode />
        <Encoder />
        <IataSearch />
    </Default>
);

export default ToolsPage;
