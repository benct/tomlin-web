import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../route/Private';
import Navigation, { NavigationItem } from '../page/Navigation';
import Error from '../page/Error';
import Stats from './MediaStats';

const MediaSearch = React.lazy(() => import('./MediaSearch'));
const MediaList = React.lazy(() => import('./MediaList'));

const menu: NavigationItem[] = [
    { text: 'Movies', path: '/media/movie' },
    { text: 'TV-Shows', path: '/media/tv' },
    { text: 'Watchlist', path: '/media/watchlist' },
    { text: 'Search', path: '/media/search' },
];

const Media: React.FC = (): React.ReactElement => (
    <>
        <Navigation type="sub" data={menu} />
        <div className="wrapper ptm">
            <Switch>
                <Route path="/media" exact component={Stats} />
                <PrivateRoute path="/media/:type(movie|tv|watchlist)/:page?" component={MediaList} />
                <PrivateRoute path="/media/search/:type?/:action?/:page?/:id?" component={MediaSearch} />
                <Route render={() => <Error code={404} />} />
            </Switch>
        </div>
    </>
);

export default React.memo(Media);
