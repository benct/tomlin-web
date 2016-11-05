import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import Home from './views/home.jsx';
import About from './views/about.jsx';
import Error from './views/error.jsx';
import Social from './components/social.jsx';

function App(props) {
    return (
        <div className="borders">
            <header>
                <img className="menu" src={require('../images/menu.svg')} alt="Menu" />
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
        <Route path="*" component={ Error } code={ 404 } />
    </Router>,
    document.getElementById('root')
);