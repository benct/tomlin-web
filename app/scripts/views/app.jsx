import React from 'react';
import PropTypes from 'prop-types';

import Social from '../components/social.jsx';
import Navigation from '../components/navigation.jsx';
import Transition from '../components/transition.jsx';

import auth from '../lib/auth.js';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleIcons = this.toggleIcons.bind(this);
        this.state = {
            loggedIn: false,
            showMenu: false,
            circleIcons: true
        };
    }

    updateAuth(loggedIn) {
        this.setState({ loggedIn });
    }

    componentWillMount() {
        auth.onChange = this.updateAuth.bind(this);
        auth.init();
    }

    toggleMenu() {
        this.setState({
            showMenu: !this.state.showMenu
        });
    }

    toggleIcons() {
        this.setState({
            circleIcons: !this.state.circleIcons
        });
    }

    render() {
        return (
            <div>
                <header className="wrapper" onClick={this.toggleMenu}/>
                <Navigation showMenu={this.state.showMenu} hideMenu={this.toggleMenu} loggedIn={this.state.loggedIn}/>
                <Transition className="content" path={this.props.location.pathname} transition="opacity .5s ease-in"
                            initialStyle={{opacity: 0, width: '100%'}} finalStyle={{opacity: 1}}>
                    { React.cloneElement(this.props.children, { loggedIn: this.state.loggedIn }) }
                </Transition>
                <footer className="wrapper">
                    <Social circle={this.state.circleIcons}/>
                    <div className="text mtl">
                        <span className="pointer unselectable" onClick={this.toggleIcons}>Ben Tomlin © 2018</span>
                    </div>
                </footer>
            </div>
        );
    }
}

App.propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
};