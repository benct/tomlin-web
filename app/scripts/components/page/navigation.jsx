import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function Navigation({ type, loggedIn, showMenu, toggleMenu }) {
    const menu = [
        { text: 'Home', path: '/', exact: true },
        { text: 'Me', path: '/me' },
        { text: 'Media', path: '/media' },
        { text: 'Files', path: '/files' },
        { text: 'Logout', path: '/logout', hide: !loggedIn },
        { text: 'Login', path: '/login', hide: loggedIn },
    ];

    const media = [
        { text: 'Movies', path: '/media/movie' },
        { text: 'TV-Shows', path: '/media/tv' },
        { text: 'Watchlist', path: '/media/watchlist' },
        { text: 'Admin', path: '/media/admin' },
    ];

    const createLink = (item, idx) =>
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
        case 'media':
            return (
                <nav className="mvm">
                    <ul className="no-select menu menu-simple menu-sub">{media.map(createLink)}</ul>
                </nav>
            );
        case 'full':
        default:
            return (
                <nav className="menu-wrap" style={{ left: showMenu ? '0px' : '100%' }} onClick={toggleMenu}>
                    <ul className={`no-select menu menu-full`} style={{ opacity: showMenu ? 1 : 0 }}>
                        {menu.map(createLink)}
                    </ul>
                </nav>
            );
    }
}

Navigation.propTypes = {
    type: PropTypes.string,
    showMenu: PropTypes.bool,
    toggleMenu: PropTypes.func,
    loggedIn: PropTypes.bool,
};
