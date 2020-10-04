import React, { lazy, memo } from 'react';
import { Route, Switch } from 'react-router-dom';

import { SuspendedRoute } from '../route/Suspended';
import { Navigation, NavigationItem } from '../page/Navigation';
import { Error } from '../page/Error';
import { MediaStats } from './MediaStats';

import '../../../styles/media.css';

const MediaSearch = lazy(() => import('./MediaSearch'));
const MediaList = lazy(() => import('./MediaList'));

const menu: NavigationItem[] = [
    { text: 'Movies', path: '/media/movie' },
    { text: 'TV-Shows', path: '/media/tv' },
    { text: 'Watchlist', path: '/media/watchlist' },
    { text: 'Search', path: '/media/search' },
];

export const Media: React.FC = () => (
    <>
        <Navigation type="sub" data={menu} />
        <div className="wrapper min-height ptm">
            <Switch>
                <Route path="/media" exact>
                    <MediaStats />
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

export default memo(Media);
