import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../route/private.jsx';
import Navigation from '../page/navigation.jsx';
import Error from '../page/error.jsx';
import Stats from './stats.jsx';

const Search = React.lazy(() => import('./search.jsx'));
const MediaList = React.lazy(() => import('./mediaList.jsx'));

const menu = [
    { text: 'Movies', path: '/media/movie' },
    { text: 'TV-Shows', path: '/media/tv' },
    { text: 'Watchlist', path: '/media/watchlist' },
    { text: 'Search', path: '/media/search' },
];

export default function Media() {
    return (
        <>
            <Navigation type="sub" data={menu} />
            <div className="wrapper ptm">
                <Switch>
                    <Route path="/media" exact component={Stats} />
                    <PrivateRoute path="/media/:type(movie|tv|watchlist)/:page?" component={MediaList} />
                    <PrivateRoute path="/media/search/:type?/:action?/:page?/:id?" component={Search} />
                    <Route render={() => <Error code={404} />} />
                </Switch>
            </div>
        </>
    );
}
