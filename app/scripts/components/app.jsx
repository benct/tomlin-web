import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import auth from '../util/auth.js';
import actions from '../actions/base.js';

import PrivateRoute from './route/private.jsx';
import Navigation from './page/navigation.jsx';
import Social from './page/social.jsx';
import Error from './page/error.jsx';
import About from './page/about.jsx';
import Home from './home/home.jsx';
import Login from './login.jsx';
import Logout from './logout.jsx';

const Links = React.lazy(() => import('./data/links.jsx'));
const Notes = React.lazy(() => import('./data/notes.jsx'));
const Files = React.lazy(() => import('./files/files.jsx'));
const Media = React.lazy(() => import('./media/media.jsx'));

class App extends React.Component {
    componentDidMount() {
        auth.onChange = this.props.setLoggedIn;
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
                            onClick={this.props.toggleMenu}>
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
                            <span className="pointer no-select" onClick={this.props.toggleIcons}>
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
    showMenu: PropTypes.bool.isRequired,
    circleIcons: PropTypes.bool.isRequired,
    toast: PropTypes.string,
    setLoggedIn: PropTypes.func.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    toggleIcons: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    showMenu: state.showMenu,
    circleIcons: state.circleIcons,
    toast: state.toast,
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
