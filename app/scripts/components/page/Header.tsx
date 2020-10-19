import { FC, memo } from 'react';
import { useDispatch } from 'react-redux';

import actions from '../../actions/base';

import { Navigation } from './Navigation';

export const Header: FC = memo(() => {
    const dispatch = useDispatch();
    return (
        <header>
            <h1 className="site-title no-select man">Tomlin</h1>
            <Navigation type="simple" />
            <Navigation type="full" />
            <button className="menu-overlay button-blank hide-gt480" aria-label="Menu" onClick={() => dispatch(actions.toggleMenu())}>
                &nbsp;
            </button>
        </header>
    );
});

Header.displayName = 'Header';
