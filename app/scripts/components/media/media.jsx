import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from '../../route/private.jsx';
import Navigation from '../page/navigation.jsx';
import Error from '../page/error.jsx';
import MediaList from './mediaList.jsx';

const Search = React.lazy(() => import('./search.jsx'));

export default function Media() {
    return (
        <>
            <Navigation type="media" />
            <div className="wrapper ptm">
                <Switch>
                    <Route path="/media" exact render={() => <Redirect to="/media/movie" />} />
                    <Route path="/media/:type(movie|tv|watchlist)/:page?" component={MediaList} />
                    <PrivateRoute path="/media/admin/:type?/:action?/:page?/:id?" component={Search} />
                    <Route render={() => <Error code={404} />} />
                </Switch>
            </div>
        </>
    );
}
