import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from '../../route/private.jsx';
import Navigation from '../page/navigation.jsx';
import Error from '../page/error.jsx';
import MediaList from './mediaList.jsx';
import Search from './search.jsx';

export default function Media() {
    return (
        <>
            <Navigation type="media" />
            <div className="wrapper ptm">
                <Switch>
                    <Route path="/media" exact render={() => <Redirect to="/media/movie" />} />
                    <Route path="/media/:type(movie|tv|watchlist)/:page?" component={MediaList} />
                    <PrivateRoute path="/media/admin/:type?/:action?/:page?" component={Search} />
                    <Route render={() => <Error code={404} />} />
                </Switch>
            </div>
        </>
    );
}
