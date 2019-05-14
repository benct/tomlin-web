import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Suspense from '../route/Suspense';
import Navigation from '../page/Navigation';
import Error from '../page/Error';
import Control from './Control';
import Logs from './Logs';
import Visits from './Visits';

const Notes = React.lazy(() => import('../notes/Notes'));
const Files = React.lazy(() => import('../files/Files'));

const menu = [
    { text: 'Logs', path: '/admin/logs' },
    { text: 'Visits', path: '/admin/visits' },
    { text: 'Notes', path: '/admin/notes' },
    { text: 'Files', path: '/admin/files' },
];

export default function Admin(): React.ReactElement {
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
                        render={(): React.ReactNode => (
                            <Suspense>
                                <Notes />
                            </Suspense>
                        )}
                    />
                    <Route
                        path="/admin/files"
                        render={(): React.ReactNode => (
                            <Suspense>
                                <Files />
                            </Suspense>
                        )}
                    />
                    <Route render={(): React.ReactNode => <Error code={404} />} />
                </Switch>
            </div>
        </>
    );
}