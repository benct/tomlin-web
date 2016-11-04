import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import Home from './views/home.jsx';
import About from './views/about.jsx';
import Social from './components/social.jsx';

function App (props) {
    return (
        <div className="wrapper">
            <header>
                <img className="menu" src={require('../images/menu.svg')} alt="Menu" />
                <nav>
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                </nav>
            </header>
            <div className="content">
                { props.children }
            </div>
            <footer>
                <Social circle={false} />
            </footer>
        </div>
    );
}

ReactDOM.render(
    <Router history={ browserHistory }>
        <Route path='/' component={ App }>
            <IndexRoute component={ Home } />
            <Route path='about' component={ About } />
        </Route>
    </Router>,
    document.getElementById('root')
);