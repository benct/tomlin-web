import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import auth from '../util/auth.js';

export default function PrivateRoute({ path, render }) {
    return (
        <Route
            path={path}
            render={routeProps =>
                auth.loggedIn() ? (
                    render(routeProps)
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: routeProps.location },
                        }}
                    />
                )
            }
        />
    );
}

PrivateRoute.propTypes = {
    path: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
};
