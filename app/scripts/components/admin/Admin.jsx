import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Suspense from '../route/Suspense.jsx';
import Navigation from '../page/Navigation.jsx';
import Error from '../page/Error.jsx';
import Control from './Control.jsx';
import Logs from './Logs.jsx';
import Visits from './Visits.jsx';

const Notes = React.lazy(() => import('../notes/Notes.jsx'));
const Files = React.lazy(() => import('../files/Files.jsx'));

const menu = [
    { text: 'Logs', path: '/admin/logs' },
    { text: 'Visits', path: '/admin/visits' },
    { text: 'Notes', path: '/admin/notes' },
    { text: 'Files', path: '/admin/files' },
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
                    <Route
                        path="/admin/notes"
                        render={() => (
                            <Suspense>
                                <Notes />
                            </Suspense>
                        )}
                    />
                    <Route
                        path="/admin/files"
                        render={() => (
                            <Suspense>
                                <Files />
                            </Suspense>
                        )}
                    />
                    <Route render={() => <Error code={404} />} />
                </Switch>
            </div>
        </>
    );
}
