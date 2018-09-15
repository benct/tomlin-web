import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import auth from './util/auth.js';

import PrivateRoute from './route/private.jsx';
import Navigation from './components/page/navigation.jsx';
import Social from './components/page/social.jsx';
import Error from './components/page/error.jsx';
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
            showMenu: false,
            circleIcons: true,
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

    render() {
        return (
            <Router>
                <>
                    <header className="wrapper" onClick={this.toggleMenu.bind(this)} />
                    <Navigation showMenu={this.state.showMenu} hideMenu={this.toggleMenu.bind(this)} loggedIn={this.state.loggedIn} />
                    <Switch>
                        <Route exact path="/" render={() => <Home loggedIn={this.state.loggedIn} />} />
                        <Route path="/login" component={Login} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/finn" component={Finn} />
                        <PrivateRoute path="/files" component={Files} />
                        <Route render={() => <Error code={404} />} />
                    </Switch>
                    <footer className="wrapper">
                        <Social circle={this.state.circleIcons} />
                        <div className="text mtl">
                            <span className="pointer unselectable" onClick={this.toggleIcons.bind(this)}>
                                Ben Tomlin © 2018
                            </span>
                        </div>
                    </footer>
                </>
            </Router>
        );
    }
}
