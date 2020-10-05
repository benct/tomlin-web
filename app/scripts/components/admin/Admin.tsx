import React, { lazy, memo } from 'react';
import { Route, Switch } from 'react-router-dom';

import { SuspendedRoute } from '../route/Suspended';
import { Navigation, NavigationItem } from '../page/Navigation';
import { Error } from '../page/Error';
import { Control } from './Control';
import { Logs } from './Logs';
import { Visits } from './Visits';

import '../../../styles/admin.css';

const Users = lazy(() => import('../users/Users'));
const Flights = lazy(() => import('../flights/Flights'));
const Notes = lazy(() => import('../notes/Notes'));
const Files = lazy(() => import('../files/Files'));

const menu: NavigationItem[] = [
    { text: 'Logs', path: '/admin/logs' },
    { text: 'Visits', path: '/admin/visits' },
    { text: 'Users', path: '/admin/users' },
    { text: 'Flights', path: '/admin/flights' },
    { text: 'Notes', path: '/admin/notes' },
    { text: 'Files', path: '/admin/files' },
];

export const Admin: React.FC = memo(() => (
    <>
        <Navigation type="sub" data={menu} />
        <div className="wrapper min-height ptm">
            <Switch>
                <Route path="/admin" exact>
                    <Control />
                </Route>
                <Route path="/admin/logs/:page?">
                    <Logs />
                </Route>
                <Route path="/admin/visits/:page?">
                    <Visits />
                </Route>
                <SuspendedRoute path="/admin/users">
                    <Users />
                </SuspendedRoute>
                <SuspendedRoute path="/admin/flights">
                    <Flights />
                </SuspendedRoute>
                <SuspendedRoute path="/admin/notes">
                    <Notes />
                </SuspendedRoute>
                <SuspendedRoute path="/admin/files">
                    <Files />
                </SuspendedRoute>
                <Route>
                    <Error code={404} />
                </Route>
            </Switch>
        </div>
    </>
));

Admin.displayName = 'Admin';
export default Admin;
