import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

import actions from '../../actions/base.js';
import { DefaultState } from '../../interfaces';

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

const Navigation: React.FC<RouteComponentProps & NavigationProps & NavigationState & DispatchProp> = (props): React.ReactElement => {
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
                <nav className="pvl">
                    <ul className="no-select menu menu-simple menu-sub">{data && data.map(createLink)}</ul>
                </nav>
            );
        case 'full':
        default:
            return (
                <nav
                    className="menu-wrap"
                    style={{ left: showMenu ? '0px' : '100%' }}
                    onClick={(): void => dispatch(actions.toggleMenu())}
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
        isLoggedIn: state.isLoggedIn,
        showMenu: state.showMenu,
    })
)(withRouter(Navigation));
