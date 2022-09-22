import { FC, ReactNode } from 'react';
import { Action } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { DefaultState } from '../../interfaces';
import actions from '../../actions/base';

interface NavigationState {
    isLoggedIn: boolean;
    showMenu: boolean;
}

interface NavigationProps {
    type?: string;
    data?: NavigationItem[];
}

export interface NavigationItem {
    text: string;
    path: string;
    exact?: boolean;
    hide?: boolean;
}

export const Navigation: FC<NavigationProps> = ({ type, data }) => {
    const dispatch = useDispatch();
    const { isLoggedIn, showMenu } = useSelector<DefaultState, NavigationState>((state) => ({
        isLoggedIn: state.auth.isLoggedIn,
        showMenu: state.showMenu,
    }));

    const menu = [
        { text: 'Home', path: '/' },
        { text: 'About', path: '/about' },
        { text: 'Media', path: '/media' },
        { text: 'Admin', path: '/admin' },
        { text: 'Logout', path: '/logout', hide: !isLoggedIn },
        { text: 'Login', path: '/login', hide: isLoggedIn },
    ];

    const createLink = (item: NavigationItem, idx: number): ReactNode =>
        item.hide ? null : (
            <li key={`menuList${idx}`}>
                <Link href={item.path}>{item.text}</Link>
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
