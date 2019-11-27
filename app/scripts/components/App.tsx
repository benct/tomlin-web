import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { DefaultState, ThunkDispatchProp } from '../interfaces';

import { validate } from '../actions/auth';

import SuspendedRoute from './route/Suspended';
import Header from './page/Header';
import Footer from './page/Footer';
import Error from './page/Error';
import About from './about/About';
import Home from './home/Home';
import Login from './Login';
import Logout from './Logout';

import '../../styles/main.css';
import '../../styles/content.css';
import '../../styles/header.css';
import '../../styles/footer.css';
import '../../styles/form.css';
import '../../styles/util.css';
import '../../styles/themes/default.css';
import '../../styles/themes/midnight.css';

const Media = React.lazy((): Promise<any> => import('./media/Media'));
const Admin = React.lazy((): Promise<any> => import('./admin/Admin'));

type AppStateProps = Pick<DefaultState, 'toast' | 'theme' | 'loading'>;

const App: React.FC<AppStateProps & ThunkDispatchProp> = props => {
    React.useEffect(() => {
        props.dispatch(validate());
    }, []);

    React.useEffect(() => {
        document.body.classList.remove('default', 'midnight');
        document.body.classList.add(props.theme);
    }, [props.theme]);

    return (
        <Router>
            <React.StrictMode>
                <Header />
                <main>
                    {props.loading ? (
                        <div className="overlay overlay-loading">
                            <div className="overlay-container shadow">
                                <div className="pac-man" />
                            </div>
                        </div>
                    ) : null}
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/login" component={Login} />
                        <SuspendedRoute path="/media" component={Media} />
                        <SuspendedRoute path="/admin" component={Admin} requireAuth />
                        <Route render={(): React.ReactElement => <Error code={404} />} />
                    </Switch>
                </main>
                <Footer />
                {props.toast ? <div className="toast">{props.toast}</div> : null}
            </React.StrictMode>
        </Router>
    );
};

const mapStateToProps = (state: DefaultState): AppStateProps => ({
    toast: state.toast,
    theme: state.theme,
    loading: state.loadingOverlay,
});

export default connect(mapStateToProps)(App);
