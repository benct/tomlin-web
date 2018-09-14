import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import auth from '../lib/auth.js';

import PrivateRoute from '../route/private.jsx';
import Navigation from '../components/navigation.jsx';
import Social from '../components/social.jsx';
import Home from './home.jsx';
import Finn from './finn.jsx';
import Login from './login.jsx';
import Logout from './logout.jsx';
import Files from './files.jsx';
import Error from './error.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleIcons = this.toggleIcons.bind(this);
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
                    <header className="wrapper" onClick={this.toggleMenu} />
                    <Navigation showMenu={this.state.showMenu} hideMenu={this.toggleMenu} loggedIn={this.state.loggedIn} />
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
                            <span className="pointer unselectable" onClick={this.toggleIcons}>
                                Ben Tomlin © 2018
                            </span>
                        </div>
                    </footer>
                </>
            </Router>
        );
    }
}
