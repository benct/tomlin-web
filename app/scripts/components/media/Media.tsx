import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SuspendedRoute from '../route/Suspended';
import Navigation, { NavigationItem } from '../page/Navigation';
import Error from '../page/Error';
import Stats from './MediaStats';

import '../../../styles/media.css';

const MediaSearch = React.lazy((): Promise<any> => import('./MediaSearch'));
const MediaList = React.lazy((): Promise<any> => import('./MediaList'));

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
                <SuspendedRoute path="/media/:type(movie|tv|watchlist)/:page?" component={MediaList} requireAuth />
                <SuspendedRoute path="/media/search/:type?/:action?/:page?/:id?" component={MediaSearch} requireAuth />
                <Route render={(): React.ReactNode => <Error code={404} />} />
            </Switch>
        </div>
    </>
);

export default React.memo(Media);
