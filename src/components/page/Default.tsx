import { PropsWithChildren } from 'react';
import Head from 'next/head';
import { Header } from '@/components/page/Header';
import { Footer } from '@/components/page/Footer';

export const Default = ({ title, children }: PropsWithChildren<{ title: string }>) => (
    <>
        <Head>
            <title>{`Tomlin - ${title}`}</title>
            <meta name="description" content="Homepage of Ben Tomlin. Software developer. Nothing much to see here." />
        </Head>
        <Header />
        <main className="max-w mx-auto">{children}</main>
        <Footer />
    </>
);
