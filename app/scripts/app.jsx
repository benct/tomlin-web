import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import auth from './util/auth.js';
import actions from './actions/base.js';

import PrivateRoute from './components/route/private.jsx';
import Navigation from './components/page/navigation.jsx';
import Social from './components/page/social.jsx';
import Error from './components/page/error.jsx';
import About from './components/page/about.jsx';
import Home from './components/home/home.jsx';
import Login from './components/login.jsx';
import Logout from './components/logout.jsx';

const Links = React.lazy(() => import('./components/data/links.jsx'));
const Notes = React.lazy(() => import('./components/data/notes.jsx'));
const Files = React.lazy(() => import('./components/files/files.jsx'));
const Media = React.lazy(() => import('./components/media/media.jsx'));

class App extends React.Component {
    componentDidMount() {
        auth.onChange = isLoggedIn => this.props.dispatch(actions.setLoggedIn(isLoggedIn));
        auth.init();
    }

    render() {
        return (
            <Router>
                <>
                    <header>
                        <div className="site-title no-select">TOMLIN</div>
                        <Navigation type="simple" />
                        <button
                            className="button-blank menu-link hide-gt480"
                            aria-label="Menu"
                            onClick={() => this.props.dispatch(actions.toggleMenu())}>
                            &nbsp;
                        </button>
                    </header>
                    <Navigation />
                    <main>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/about" component={About} />
                            <Route
                                path="/finn"
                                render={() => (
                                    <React.Suspense fallback={<div className="wrapper text-center">Loading...</div>}>
                                        <Links file="finn.json" />
                                        <hr />
                                        <Notes file="finn.txt" />
                                    </React.Suspense>
                                )}
                            />
                            <Route path="/logout" component={Logout} />
                            <Route path="/login" component={Login} />
                            <PrivateRoute path="/media" component={Media} />
                            <PrivateRoute path="/files" component={Files} />
                            <Route render={() => <Error code={404} />} />
                        </Switch>
                    </main>
                    <footer className="wrapper">
                        <Social circle={this.props.circleIcons} />
                        <div className="text color-light mtl">
                            <span className="pointer no-select" onClick={() => this.props.dispatch(actions.toggleIcons())}>
                                Ben Tomlin © 2018
                            </span>
                        </div>
                    </footer>
                    {this.props.toast ? <div className="toast">{this.props.toast}</div> : null}
                </>
            </Router>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    showMenu: PropTypes.bool.isRequired,
    circleIcons: PropTypes.bool.isRequired,
    toast: PropTypes.string,
};

export default connect(state => ({
    showMenu: state.showMenu,
    circleIcons: state.circleIcons,
    toast: state.toast,
}))(App);
