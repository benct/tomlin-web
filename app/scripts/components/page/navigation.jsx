import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function Navigation({ loggedIn, showMenu, toggleMenu, simple }) {
    const menu = [
        { text: 'Home', path: '/', exact: true },
        { text: 'Media', path: '/media' },
        { text: 'Files', path: '/files' },
        { text: 'Finn', path: '/finn', hide: !loggedIn },
        { text: 'Logout', path: '/logout', hide: !loggedIn },
        { text: 'Login', path: '/login', hide: loggedIn },
    ];

    const createLink = (item, idx) =>
        item.hide ? null : (
            <li key={`menuList${idx}`}>
                <NavLink to={item.path} exact={!!item.exact}>{item.text}</NavLink>
            </li>
        );

    return (
        <nav className={simple ? 'wrapper centerify' : 'menu-wrap'} style={{ left: showMenu ? '0px' : '100%' }} onClick={toggleMenu}>
            <ul className={`unselectable menu ${simple ? 'menu-simple' : 'menu-full'}`} style={{ opacity: showMenu ? 1 : 0 }}>
                {menu.map(createLink)}
            </ul>
        </nav>
    );
}

Navigation.propTypes = {
    showMenu: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func,
    simple: PropTypes.bool,
    loggedIn: PropTypes.bool,
};
