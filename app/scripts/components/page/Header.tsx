import React from 'react';
import { useDispatch } from 'react-redux';

import actions from '../../actions/base';

import Navigation from './Navigation';

const Header: React.FC = () => {
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
};

export default React.memo(Header);
