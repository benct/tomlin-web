import React from 'react';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { DefaultState, ThunkDispatchProp } from '../../interfaces';
import actions from '../../actions/base';

interface NavigationProps {
    type?: string;
    data?: NavigationItem[];
}

interface NavigationState {
    isLoggedIn: boolean;
    showMenu: boolean;
}

export interface NavigationItem {
    text: string;
    path: string;
    exact?: boolean;
    hide?: boolean;
}

const Navigation: React.FC<NavigationProps & NavigationState & ThunkDispatchProp> = (props): React.ReactElement => {
    const { type, data, isLoggedIn, showMenu, dispatch } = props;

    const menu = [
        { text: 'Home', path: '/', exact: true },
        { text: 'About', path: '/about' },
        { text: 'Media', path: '/media' },
        { text: 'Admin', path: '/admin' },
        { text: 'Logout', path: '/logout', hide: !isLoggedIn },
        { text: 'Login', path: '/login', hide: isLoggedIn },
    ];

    const createLink = (item: NavigationItem, idx: number): React.ReactNode =>
        item.hide ? null : (
            <li key={`menuList${idx}`}>
                <NavLink to={item.path} exact={!!item.exact}>
                    {item.text}
                </NavLink>
            </li>
        );

    switch (type) {
        case 'simple':
            return (
                <nav className="menu-top hide-lt480">
                    <ul className="no-select menu menu-simple">{menu.map(createLink)}</ul>
                </nav>
            );
        case 'sub':
            return (
                <nav className="color-bg pvl">
                    <ul className="no-select menu menu-simple menu-sub">{data?.map(createLink)}</ul>
                </nav>
            );
        case 'full':
        default:
            return (
                <nav
                    className="menu-wrap"
                    style={{ left: showMenu ? '0px' : '100%' }}
                    onClick={(): Action => dispatch(actions.toggleMenu())}
                    role="dialog">
                    <ul className={`no-select menu menu-full`} style={{ opacity: showMenu ? 1 : 0 }}>
                        {menu.map(createLink)}
                    </ul>
                </nav>
            );
    }
};

export default connect(
    (state: DefaultState): NavigationState => ({
        isLoggedIn: state.auth.isLoggedIn,
        showMenu: state.showMenu,
    })
)(Navigation);
