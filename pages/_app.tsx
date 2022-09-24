import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import { store } from '../redux/store';

import { AppContextProvider } from '../data/context';
import { Layout } from '../components/Layout';

import '../styles/globals.css';
import '../styles/content.css';
import '../styles/header.css';
import '../styles/footer.css';
import '../styles/form.css';
import '../styles/util.css';
import '../styles/themes/default.css';
import '../styles/themes/midnight.css';

// TODO modularize css
import '../styles/home.css';
import '../styles/about.css';
import '../styles/media.css';
import '../styles/admin.css';
import '../styles/files.css';

const App = ({ Component, pageProps }: AppProps) => (
    <Provider store={store}>
        <StrictMode>
            <AppContextProvider>
                <Layout {...pageProps}>
                    <Component {...pageProps} />
                </Layout>
            </AppContextProvider>
        </StrictMode>
    </Provider>
);

export default App;
