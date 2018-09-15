import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import auth from '../util/auth.js';

export default function PrivateRoute({ path, component: Component }) {
    return (
        <Route
            path={path}
            render={props =>
                auth.loggedIn() ? (
                    <Component {...props} />
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
