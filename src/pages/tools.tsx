import type { GetStaticProps, NextPage } from 'next';
import { QRCode } from '@/components/tools/QRCode';

const ToolsPage: NextPage = () => (
    <>
        <QRCode />
    </>
);

export const getStaticProps: GetStaticProps = async () => ({ props: { title: 'Tools', standalone: false } });

export default ToolsPage;
