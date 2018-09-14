import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import auth from '../lib/auth';

export default function PrivateRoute({ component: Component, ...rest }) {
    return <Route
        {...rest}
        render={props =>
            auth.loggedIn() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
}