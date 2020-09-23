import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SuspendedRoute from '../route/Suspended';
import Navigation, { NavigationItem } from '../page/Navigation';
import Error from '../page/Error';
import Stats from './MediaStats';

import '../../../styles/media.css';

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
        <div className="wrapper min-height ptm">
            <Switch>
                <Route path="/media" exact>
                    <Stats />
                </Route>
                <SuspendedRoute path="/media/:type(movie|tv|watchlist)/:page?" authentication>
                    <MediaList />
                </SuspendedRoute>
                <SuspendedRoute path="/media/search/:type?/:action?/:page?/:id?" authentication>
                    <MediaSearch />
                </SuspendedRoute>
                <Route>
                    <Error code={404} />
                </Route>
            </Switch>
        </div>
    </>
);

export default React.memo(Media);
