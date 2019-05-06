import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from '../page/navigation.jsx';
import Error from '../page/error.jsx';
import Control from './control.jsx';
import Logs from './logs.jsx';
import Visits from './visits.jsx';
import Notes from '../notes/notes.jsx';

const menu = [
    { text: 'Logs', path: '/admin/logs' },
    { text: 'Visits', path: '/admin/visits' },
    { text: 'Notes', path: '/admin/notes' },
    { text: 'Todo', path: '/admin/todo' },
];

export default function Admin() {
    return (
        <>
            <Navigation type="sub" data={menu} />
            <div className="wrapper ptm">
                <Switch>
                    <Route path="/admin" exact component={Control} />
                    <Route path="/admin/logs" component={Logs} />
                    <Route path="/admin/visits" component={Visits} />
                    <Route path="/admin/notes" component={Notes} />
                    <Route render={() => <Error code={404} />} />
                </Switch>
            </div>
        </>
    );
}
