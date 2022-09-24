import { FC } from 'react';

import { Navigation } from './Navigation';

export const Header: FC = () => (
    <header>
        <h1 className="site-title no-select man">Tomlin</h1>
        <Navigation type="simple" />
        <Navigation type="full" />
    </header>
);
