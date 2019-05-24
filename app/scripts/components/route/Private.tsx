import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import auth from '../../util/auth.js';

import Suspense from './Suspense';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PrivateComponent = typeof React.Component | React.LazyExoticComponent<React.NamedExoticComponent> | any;

interface PrivateProps {
    path: string;
    component: PrivateComponent;
}

const PrivateRoute: React.FC<PrivateProps> = ({ path, component: Component }): React.ReactElement => (
    <Route
        path={path}
        render={(props: RouteProps): React.ReactElement =>
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

export default PrivateRoute;
