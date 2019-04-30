import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from '../page/navigation.jsx';
import Error from '../page/error.jsx';
import Control from './control.jsx';
import Logs from './logs.jsx';
import Visits from './visits.jsx';

export default function Admin() {
    return (
        <>
            {/* TODO create admin nav content here */}
            <Navigation type="admin" />
            <div className="wrapper ptm">
                <Switch>
                    <Route path="/admin" exact component={Control} />
                    <Route path="/admin/logs" component={Logs} />
                    <Route path="/admin/visits" component={Visits} />
                    <Route render={() => <Error code={404} />} />
                </Switch>
            </div>
        </>
    );
}
