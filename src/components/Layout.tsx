import { FC, PropsWithChildren, useEffect } from 'react';
import Head from 'next/head';
import { Icon } from '@mdi/react';
import { mdiLoading } from '@mdi/js';

import { useAppContext } from '@/data/context';
import { useInit } from '@/data/auth';

import { NextPageProps } from '@/interfaces';
import { Header } from './page/Header';
import { Footer } from './page/Footer';

export const Layout: FC<PropsWithChildren<NextPageProps>> = ({ title, standalone, children }) => {
    const { toast, loading } = useAppContext();
    useInit();

    useEffect(() => {
        document.body.classList.add('bg-body-light');
        document.body.classList.add('dark:bg-body-dark');
        document.body.classList.add('h-screen');
    }, []);

    const siteTitle = `Tomlin - ${title ?? 'Home'}`;

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="description" content="Homepage of Ben Tomlin. Software developer. Nothing much to see here." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="robots" content="index, nofollow" />

                <title>{siteTitle}</title>

                <link rel="author" href="/humans.txt" type="text/plain" />
                <link rel="preconnect" href="https://api.tomlin.no" />

                <link rel="apple-touch-icon" sizes="180x180" href="/manifest/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/manifest/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/manifest/favicon-16x16.png" />
                <link rel="manifest" href="/manifest/manifest.json" />
                <link rel="mask-icon" href="/manifest/safari-pinned-tab.svg" color="#002080" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta name="apple-mobile-web-app-title" content="Tomlin" />
                <meta name="application-name" content="Tomlin" />
                <meta name="msapplication-TileColor" content="#002080" />
                <meta name="msapplication-config" content="/manifest/browserconfig.xml" />
                <meta name="theme-color" content="#002080" />
            </Head>
            <Header standalone={standalone} />
            <main className="max-w mx-auto">{children}</main>
            {standalone ? null : <Footer />}
            {loading ? (
                <div className="bg-slate-900 bg-opacity-50 fixed inset-0 z-50 flex place-content-center place-items-center">
                    <Icon path={mdiLoading} size={10} spin className="text-primary dark:text-primary-dark" />
                </div>
            ) : null}
            {toast ? <div className="toast text-primary dark:text-primary-dark bg-light dark:bg-dark">{toast}</div> : null}
        </>
    );
};