import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import auth from '../util/auth.js';

export default function PrivateRoute({ path, component: Component, extraProps }) {
    return (
        <Route
            path={path}
            render={props =>
                auth.loggedIn() ? (
                    <Component {...props} {...extraProps} />
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
