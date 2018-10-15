import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import auth from './util/auth.js';

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

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            circleIcons: true,
            showMenu: false,
            showToast: false,
            toast: '',
        };
    }

    updateAuth(loggedIn) {
        this.setState({ loggedIn });
    }

    componentDidMount() {
        auth.onChange = this.updateAuth.bind(this);
        auth.init();
    }

    toggleMenu() {
        this.setState({
            showMenu: !this.state.showMenu,
        });
    }

    toggleIcons() {
        this.setState({
            circleIcons: !this.state.circleIcons,
        });
    }

    showToast(text) {
        this.setState({ showToast: true, toast: text });

        setTimeout(() => this.setState({ showToast: false, toast: '' }), 3000);
    }

    render() {
        return (
            <Router>
                <>
                    <header>
                        <div className="site-title no-select">TOMLIN</div>
                        <Navigation type="simple" loggedIn={this.state.loggedIn} />
                        <MenuIcon className="hide-gt480 menu-icon" onClick={this.toggleMenu.bind(this)} />
                    </header>
                    <Navigation showMenu={this.state.showMenu} toggleMenu={this.toggleMenu.bind(this)} loggedIn={this.state.loggedIn} />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/finn" component={Finn} />
                        <Route path="/about" component={About} />
                        <PrivateRoute path="/files" component={Files} extraProps={{ showToast: this.showToast.bind(this) }} />
                        <Route render={() => <Error code={404} />} />
                    </Switch>
                    <footer className="wrapper">
                        <Social circle={this.state.circleIcons} />
                        <div className="text color-light mtl">
                            <span className="pointer no-select" onClick={this.toggleIcons.bind(this)}>
                                Ben Tomlin © 2018
                            </span>
                        </div>
                    </footer>
                    {this.state.showToast ? <div className="toast">{this.state.toast}</div> : null}
                </>
            </Router>
        );
    }
}
