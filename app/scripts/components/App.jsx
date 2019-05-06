import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import auth from '../util/auth.js';
import actions from '../actions/base.js';

import PrivateRoute from './route/Private.jsx';
import Suspense from './route/Suspense.jsx';
import Navigation from './page/Navigation.jsx';
import Social from './page/Social.jsx';
import Error from './page/Error.jsx';
import About from './page/About.jsx';
import Home from './home/Home.jsx';
import Login from './Login.jsx';
import Logout from './Logout.jsx';

const Links = React.lazy(() => import('./data/Links.jsx'));
const Media = React.lazy(() => import('./media/Media.jsx'));
const Admin = React.lazy(() => import('./admin/Admin.jsx'));

class App extends React.Component {
    componentDidMount() {
        auth.onChange = this.props.setLoggedIn;
        auth.init();
    }

    render() {
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
                                path="/finn"
                                render={() => (
                                    <Suspense>
                                        <Links file="finn.json" />
                                    </Suspense>
                                )}
                            />
                            <Route path="/logout" component={Logout} />
                            <Route path="/login" component={Login} />
                            <Route
                                path="/media"
                                render={() => (
                                    <Suspense>
                                        <Media />
                                    </Suspense>
                                )}
                            />
                            <PrivateRoute path="/admin" component={Admin} />
                            <Route render={() => <Error code={404} />} />
                        </Switch>
                    </main>
                    <footer>
                        <Social circle={this.props.circleIcons} />
                        <div className="text color-light mtl">
                            <span className="pointer no-select" onClick={this.props.toggleIcons}>
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

App.propTypes = {
    showMenu: PropTypes.bool.isRequired,
    circleIcons: PropTypes.bool.isRequired,
    toast: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    setLoggedIn: PropTypes.func.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    toggleIcons: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    showMenu: state.showMenu,
    circleIcons: state.circleIcons,
    toast: state.toast,
    loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
    setLoggedIn: isLoggedIn => dispatch(actions.setLoggedIn(isLoggedIn)),
    toggleMenu: () => dispatch(actions.toggleMenu()),
    toggleIcons: () => dispatch(actions.toggleIcons()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
