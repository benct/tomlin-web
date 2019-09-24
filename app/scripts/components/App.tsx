import React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { DefaultState, ThunkDispatchFunc } from '../interfaces';

import actions from '../actions/base';
import { validate } from '../actions/auth';

import SuspendedRoute from './route/Suspended';
import Navigation from './page/Navigation';
import Social from './page/Social';
import Error from './page/Error';
import About from './about/About';
import Home from './home/Home';
import Login from './Login';
import Logout from './Logout';

const Media = React.lazy((): Promise<any> => import('./media/Media'));
const Admin = React.lazy((): Promise<any> => import('./admin/Admin'));

interface AppStateProps {
    showMenu: boolean;
    circleIcons: boolean;
    toast: string | null;
    loading: boolean;
}

interface AppDispatchProps {
    validate: () => void;
    toggleMenu: () => void;
    toggleIcons: () => void;
}

class App extends React.Component<AppStateProps & AppDispatchProps> {
    componentDidMount(): void {
        this.props.validate();
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
                            <Route path="/logout" component={Logout} />
                            <Route path="/login" component={Login} />
                            <SuspendedRoute path="/media" component={Media} />
                            <SuspendedRoute path="/admin" component={Admin} requireAuth />
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
    loading: state.loadingOverlay,
});

const mapDispatchToProps = (dispatch: ThunkDispatchFunc): AppDispatchProps => ({
    validate: (): Promise<void> => dispatch(validate()),
    toggleMenu: (): Action => dispatch(actions.toggleMenu()),
    toggleIcons: (): Action => dispatch(actions.toggleIcons()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
