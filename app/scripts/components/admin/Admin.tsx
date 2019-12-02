import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SuspendedRoute from '../route/Suspended';
import Navigation, { NavigationItem } from '../page/Navigation';
import Error from '../page/Error';
import Control from './Control';
import Logs from './Logs';
import Visits from './Visits';

import '../../../styles/admin.css';

const Flights = React.lazy(() => import('../flights/Flights'));
const Notes = React.lazy(() => import('../notes/Notes'));
const Files = React.lazy(() => import('../files/Files'));

const menu: NavigationItem[] = [
    { text: 'Logs', path: '/admin/logs' },
    { text: 'Visits', path: '/admin/visits' },
    { text: 'Flights', path: '/admin/flights' },
    { text: 'Notes', path: '/admin/notes' },
    { text: 'Files', path: '/admin/files' },
];

const Admin: React.FC = (): React.ReactElement => (
    <>
        <Navigation type="sub" data={menu} />
        <div className="wrapper min-height ptm">
            <Switch>
                <Route path="/admin" exact component={Control} />
                <Route path="/admin/logs" component={Logs} />
                <Route path="/admin/visits" component={Visits} />
                <SuspendedRoute path="/admin/flights" component={Flights} />
                <SuspendedRoute path="/admin/notes" component={Notes} />
                <SuspendedRoute path="/admin/files" component={Files} />
                <Route render={(): React.ReactNode => <Error code={404} />} />
            </Switch>
        </div>
    </>
);

export default React.memo(Admin);
