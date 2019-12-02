import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import Loading from '../page/Loading';

type SuspendedComponent = typeof React.Component | React.FunctionComponent | React.LazyExoticComponent<any>;

interface SuspendedProps {
    path: string;
    component: SuspendedComponent;
    requireAuth?: boolean;
    extraProps?: object;
}

const isLoggedIn = (): boolean => !!localStorage.getItem('token');

const SuspendedRoute: React.FC<SuspendedProps> = ({ path, component: Component, requireAuth, extraProps }): React.ReactElement => (
    <Route
        path={path}
        render={(props: RouteProps): React.ReactElement =>
            !requireAuth || isLoggedIn() ? (
                <React.Suspense fallback={<Loading isLoading className="wrapper min-height" />}>
                    <Component {...props} {...extraProps} />
                </React.Suspense>
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

export default SuspendedRoute;
