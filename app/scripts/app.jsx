import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import auth from './util/auth.js';
import actions from './actions/base.js';

import { MenuIcon } from './components/page/icons.jsx';
import PrivateRoute from './route/private.jsx';
import Navigation from './components/page/navigation.jsx';
import Social from './components/page/social.jsx';
import Error from './components/page/error.jsx';
import About from './components/page/about.jsx';
import Home from './components/home/home.jsx';
import Finn from './components/data/finn.jsx';
import Files from './components/files/files.jsx';
import Login from './components/login.jsx';
import Logout from './components/logout.jsx';
import Media from './components/media/media.jsx';

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
                        <MenuIcon className="hide-gt480 menu-icon" onClick={() => this.props.dispatch(actions.toggleMenu())} />
                    </header>
                    <Navigation />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/finn" component={Finn} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/login" component={Login} />
                        <PrivateRoute // Temporarily restricted
                            path="/media"
                            component={Media}
                        />
                        <PrivateRoute path="/files" component={Files} />
                        <Route render={() => <Error code={404} />} />
                    </Switch>
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
