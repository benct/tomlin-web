import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './views/app.jsx';
import Home from './views/home.jsx';
import About from './views/about.jsx';
import Login from './views/login.jsx';
import Logout from './views/logout.jsx';
import Files from './views/files.jsx';
import Error from './views/error.jsx';

import auth from './lib/auth.js';

function requireAuthentication(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}

ReactDOM.render(
    <Router history={ browserHistory }>
        <Route path='/' component={ App }>
            <IndexRoute component={ Home } />
            <Route path='about' component={ About } />
            <Route path="login" component={ Login } />
            <Route path="logout" component={ Logout } />
            <Route path="files" component={ Files } onEnter={ requireAuthentication } />
        </Route>
        <Route path="*" component={ Error } code={ 404 } />
    </Router>,
    document.getElementById('root')
);