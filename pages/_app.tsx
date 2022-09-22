import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import { store } from '../redux/store';

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

const App = ({ Component, pageProps }: AppProps) => (
    <Provider store={store}>
        <Layout {...pageProps}>
            <Component {...pageProps} />
        </Layout>
    </Provider>
);

export default App;
