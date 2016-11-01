import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import Home from './views/home.jsx';
import About from './views/about.jsx';

function App (props) {
    return (
        <div className="wrapper">
            <header>
                <nav>
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                </nav>
            </header>
            <div className="content">
                { props.children }
            </div>
            <footer>
                footer
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
    document.getElementById('container')
);