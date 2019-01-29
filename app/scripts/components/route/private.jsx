import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import auth from '../../util/auth.js';

import Suspense from './suspense.jsx';

export default function PrivateRoute({ path, component: Component }) {
    return (
        <Route
            path={path}
            render={props =>
                auth.loggedIn() ? (
                    <Suspense>
                        <Component {...props} />
                    </Suspense>
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
}

PrivateRoute.propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
    location: PropTypes.object,
};
