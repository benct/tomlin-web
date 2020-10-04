import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import { DefaultState } from '../../interfaces';

import { Header } from './Header';
import { Footer } from './Footer';

const simplePages = ['/finn'];

export const Page: React.FC = ({ children }) => {
    const location = useLocation();
    const state = useSelector<DefaultState, Pick<DefaultState, 'toast' | 'theme' | 'loading'>>((state) => ({
        toast: state.toast,
        theme: state.theme,
        loading: state.loadingOverlay,
    }));

    const simple = simplePages.includes(location.pathname);

    useEffect(() => {
        document.title = `Tomlin - ${location.pathname}`;
    });

    useEffect(() => {
        document.body.classList.remove('default', 'midnight');
        document.body.classList.add(state.theme);
        localStorage.setItem('theme', state.theme);
    }, [state.theme]);

    return (
        <>
            {simple ? null : <Header />}
            <main>{children}</main>
            {simple ? null : <Footer />}
            {state.loading ? (
                <div className="overlay overlay-loading">
                    <div className="overlay-container shadow">
                        <div className="pac-man" />
                    </div>
                </div>
            ) : null}
            {state.toast ? <div className="toast">{state.toast}</div> : null}
        </>
    );
};
