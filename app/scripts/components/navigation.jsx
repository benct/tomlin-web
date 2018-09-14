import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Navigation({ loggedIn, showMenu, hideMenu, hideHome, simple }) {
    return (
        <nav className={simple ? 'wrapper centerify' : 'menu-wrap'} style={{ left: showMenu ? '0px' : '100%' }} onClick={hideMenu}>
            <ul className={`unselectable menu ${simple ? '' : 'menu-full'}`} style={{ opacity: showMenu ? 1 : 0 }}>
                {hideHome ? null : (
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                )}
                <li>
                    <Link to="/files">Files</Link>
                </li>
                <li>
                    <Link to="/finn">FINN</Link>
                </li>
                {loggedIn ? (
                    <li>
                        <Link to="/logout">Logout</Link>
                    </li>
                ) : (
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

Navigation.propTypes = {
    showMenu: PropTypes.bool.isRequired,
    hideMenu: PropTypes.func,
    hideHome: PropTypes.bool,
    simple: PropTypes.bool,
    loggedIn: PropTypes.bool,
};
