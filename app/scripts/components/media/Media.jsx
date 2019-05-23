import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../route/Private';
import Navigation from '../page/Navigation';
import Error from '../page/Error';
import Stats from './MediaStats.jsx';

const Search = React.lazy(() => import('./MediaSearch.jsx'));
const MediaList = React.lazy(() => import('./MediaList.jsx'));

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
