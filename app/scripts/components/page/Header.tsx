import React from 'react';
import { Action } from 'redux';
import { connect } from 'react-redux';

import { ThunkDispatchProp } from '../../interfaces';
import actions from '../../actions/base';

import Navigation from './Navigation';

const Header: React.FC<ThunkDispatchProp> = ({ dispatch }): React.ReactElement => (
    <header>
        <h1 className="site-title no-select man">Tomlin</h1>
        <Navigation type="simple" />
        <Navigation type="full" />
        <button className="menu-overlay button-blank hide-gt480" aria-label="Menu" onClick={(): Action => dispatch(actions.toggleMenu())}>
            &nbsp;
        </button>
    </header>
);

export default connect()(React.memo(Header));
