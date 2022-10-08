import type { AppProps } from 'next/app';

import { AppContextProvider } from '@/data/context';
import { Layout } from '@/components/Layout';

import '../styles/globals.css';
import '../styles/util.css';

const App = ({ Component, pageProps }: AppProps) => (
    <AppContextProvider>
        <Layout {...pageProps}>
            <Component {...pageProps} />
        </Layout>
    </AppContextProvider>
);

export default App;
