import { FC, PropsWithChildren, useEffect } from 'react';
import Head from 'next/head';

import { useAppContext } from '../data/context';
import { useAuthenticate } from '../data/auth';

import { Header } from './page/Header';
import { Footer } from './page/Footer';
import { NextPageProps } from '../interfaces';

export const Layout: FC<PropsWithChildren<NextPageProps>> = ({ title, standalone, children }) => {
    const { toast } = useAppContext();
    const { loading } = useAuthenticate();

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
            {standalone ? (
                <main>{children}</main>
            ) : (
                <>
                    <Header />
                    <main className="max-w mx-auto bg-white">{children}</main>
                    <Footer />
                </>
            )}
            {loading ? (
                <div className="overlay overlay-loading">
                    <div className="overlay-container shadow">
                        <div className="pac-man" />
                    </div>
                </div>
            ) : null}
            {toast ? <div className="toast text-primary dark:text-primary-dark bg-light dark:bg-dark">{toast}</div> : null}
        </>
    );
};
