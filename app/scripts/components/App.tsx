import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import auth from '../util/auth';
import actions from '../actions/base.js';
import { DefaultState } from '../interfaces';

import PrivateRoute from './route/Private';
import Suspense from './route/Suspense';
import Navigation from './page/Navigation';
import Social from './page/Social';
import Error from './page/Error';
import About from './page/About';
import Home from './home/Home';
import Login from './Login';
import Logout from './Logout';

const Links = React.lazy(() => import('./page/Links'));
const Media = React.lazy(() => import('./media/Media'));
const Admin = React.lazy(() => import('./admin/Admin'));

interface AppStateProps {
    showMenu: boolean;
    circleIcons: boolean;
    toast: string | null;
    loading: boolean;
}

interface AppDispatchProps {
    setLoggedIn: (isLoggedIn: boolean) => void;
    toggleMenu: () => void;
    toggleIcons: () => void;
}

class App extends React.Component<AppStateProps & AppDispatchProps> {
    componentDidMount(): void {
        auth.onChange = this.props.setLoggedIn;
        auth.init();
    }

    render(): React.ReactNode {
        return (
            <Router>
                <React.StrictMode>
                    <header>
                        <h1 className="site-title no-select">Tomlin</h1>
                        <Navigation type="simple" />
                        <button className="menu-overlay button-blank hide-gt480" aria-label="Menu" onClick={this.props.toggleMenu}>
                            &nbsp;
                        </button>
                    </header>
                    <Navigation />
                    <main>
                        {this.props.loading ? (
                            <div className="overlay overlay-loading">
                                <div className="overlay-container shadow">
                                    <div className="pac-man" />
                                </div>
                            </div>
                        ) : null}
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/about" component={About} />
                            <Route
                                path="/links"
                                render={(): React.ReactElement => (
                                    <Suspense>
                                        <Links file="default.json" />
                                    </Suspense>
                                )}
                            />
                            <Route
                                path="/finn"
                                render={(): React.ReactElement => (
                                    <Suspense>
                                        <Links file="finn.json" />
                                    </Suspense>
                                )}
                            />
                            <Route path="/logout" component={Logout} />
                            <Route path="/login" component={Login} />
                            <Route
                                path="/media"
                                render={(): React.ReactElement => (
                                    <Suspense>
                                        <Media />
                                    </Suspense>
                                )}
                            />
                            <PrivateRoute path="/admin" component={Admin} />
                            <Route render={(): React.ReactElement => <Error code={404} />} />
                        </Switch>
                    </main>
                    <footer>
                        <Social circle={this.props.circleIcons} />
                        <div className="text color-light mtl">
                            <span className="pointer no-select" onClick={this.props.toggleIcons} role="button" tabIndex={-1}>
                                Ben Tomlin © 2019
                            </span>
                        </div>
                    </footer>
                    {this.props.toast ? <div className="toast">{this.props.toast}</div> : null}
                </React.StrictMode>
            </Router>
        );
    }
}

const mapStateToProps = (state: DefaultState): AppStateProps => ({
    showMenu: state.showMenu,
    circleIcons: state.circleIcons,
    toast: state.toast,
    loading: state.loading,
});

const mapDispatchToProps = (dispatch: Dispatch): AppDispatchProps => ({
    setLoggedIn: (isLoggedIn: boolean): void => dispatch(actions.setLoggedIn(isLoggedIn)),
    toggleMenu: (): void => dispatch(actions.toggleMenu()),
    toggleIcons: (): void => dispatch(actions.toggleIcons()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
