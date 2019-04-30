import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

import actions from '../../actions/base.js';

function Navigation({ type, data, isLoggedIn, showMenu, dispatch }) {
    const menu = [
        { text: 'Home', path: '/', exact: true },
        { text: 'About', path: '/about' },
        { text: 'Media', path: '/media' },
        { text: 'Files', path: '/files' },
        { text: 'Admin', path: '/admin', hide: !isLoggedIn },
        { text: 'Logout', path: '/logout', hide: !isLoggedIn },
        { text: 'Login', path: '/login', hide: isLoggedIn },
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
        case 'sub':
            return (
                <nav className="pvl">
                    <ul className="no-select menu menu-simple menu-sub">{data.map(createLink)}</ul>
                </nav>
            );
        case 'full':
        default:
            return (
                <nav
                    className="menu-wrap"
                    style={{ left: showMenu ? '0px' : '100%' }}
                    onClick={() => dispatch(actions.toggleMenu())}
                    role="dialog">
                    <ul className={`no-select menu menu-full`} style={{ opacity: showMenu ? 1 : 0 }}>
                        {menu.map(createLink)}
                    </ul>
                </nav>
            );
    }
}

Navigation.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    showMenu: PropTypes.bool.isRequired,
    type: PropTypes.string,
    data: PropTypes.array,
};

export default withRouter(
    connect(state => ({
        isLoggedIn: state.isLoggedIn,
        showMenu: state.showMenu,
    }))(Navigation)
);
