import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import Home from './views/home.jsx';
import About from './views/about.jsx';
import Error from './views/error.jsx';
import Social from './components/social.jsx';
import Transition from './components/transition.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state = {
            showMenu: false,
            circleIcons: false
        };
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
            <div className="borders">
                <header>
                    <h1 className="logo">Tomlin<span className="color no-upper">.no</span></h1>
                    <img className="menu-icon" src={require('../images/menu.svg')} alt="Menu" onClick={this.toggleMenu} />
                </header>
                <nav className="menu-wrap" style={{left: (this.state.showMenu ? '0px' : '100%')}}>
                    <ul className="menu" style={{opacity: (this.state.showMenu ? 1 : 0)}}>
                        <li><Link to="/" onClick={this.toggleMenu}>Home</Link></li>
                        <li><Link to="/about" onClick={this.toggleMenu}>About</Link></li>
                        <li><a onClick={this.toggleIcons.bind(this)}>Toggle</a></li>
                        <li><Link to="/login" onClick={this.toggleMenu}>Login</Link></li>
                    </ul>
                </nav>
                <Transition className="content" path={location.pathname} transition="opacity .5s ease-in"
                            initialStyle={{opacity: 0}} finalStyle={{opacity: 1}}>
                    { this.props.children }
                </Transition>
                <footer>
                    <Social circle={this.state.circleIcons}/>
                </footer>
            </div>
        );
    }
}

ReactDOM.render(
    <Router history={ browserHistory }>
        <Route path='/' component={ App }>
            <IndexRoute component={ Home } />
            <Route path='about' component={ About } />
        </Route>
        <Route path="*" component={ Error } code={ 404 } />
    </Router>,
    document.getElementById('root')
);