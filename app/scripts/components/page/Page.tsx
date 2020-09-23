import React, { ReactNode } from 'react';
import { connect } from 'react-redux';

import { DefaultState, ThunkDispatchProp } from '../../interfaces';

import Header from './Header';
import Footer from './Footer';

type PageProps = {
    children: ReactNode;
};
type PageStateProps = Pick<DefaultState, 'toast' | 'theme' | 'loading'>;

const Page: React.FC<PageProps & PageStateProps & ThunkDispatchProp> = (props) => {
    React.useEffect(() => {
        document.body.classList.remove('default', 'midnight');
        document.body.classList.add(props.theme);
        localStorage.setItem('theme', props.theme);
    }, [props.theme]);

    return (
        <>
            <Header />
            <main>{props.children}</main>
            <Footer />
            {props.loading ? (
                <div className="overlay overlay-loading">
                    <div className="overlay-container shadow">
                        <div className="pac-man" />
                    </div>
                </div>
            ) : null}
            {props.toast ? <div className="toast">{props.toast}</div> : null}
        </>
    );
};

const mapStateToProps = (state: DefaultState): PageStateProps => ({
    toast: state.toast,
    theme: state.theme,
    loading: state.loadingOverlay,
});

export default connect(mapStateToProps)(Page);
