import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { validate } from '../actions/auth';

import SuspendedRoute from './route/Suspended';
import Page from './page/Page';
import Error from './page/Error';
import About from './about/About';
import Home from './home/Home';
import Login from './Login';
import Logout from './Logout';

import '../../styles/main.css';
import '../../styles/content.css';
import '../../styles/header.css';
import '../../styles/footer.css';
import '../../styles/form.css';
import '../../styles/util.css';
import '../../styles/themes/default.css';
import '../../styles/themes/midnight.css';

const Media = React.lazy(() => import('./media/Media'));
const Admin = React.lazy(() => import('./admin/Admin'));

export const App: React.FC = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(validate());
    }, []);

    return (
        <Router>
            <React.StrictMode>
                <Page>
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/logout">
                            <Logout />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <SuspendedRoute path="/media">
                            <Media />
                        </SuspendedRoute>
                        <SuspendedRoute path="/admin" authentication>
                            <Admin />
                        </SuspendedRoute>
                        <Route>
                            <Error code={404} />
                        </Route>
                    </Switch>
                </Page>
            </React.StrictMode>
        </Router>
    );
};
