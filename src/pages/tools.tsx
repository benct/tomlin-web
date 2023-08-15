import type { GetStaticProps, NextPage } from 'next';
import { QRCode } from '@/components/tools/QRCode';
import { Encoder } from '@/components/tools/Encoder';

const ToolsPage: NextPage = () => (
    <>
        <QRCode />
        <Encoder />
    </>
);

export const getStaticProps: GetStaticProps = async () => ({ props: { title: 'Tools', standalone: false } });

export default ToolsPage;
