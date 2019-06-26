import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

type SuspendedComponent = typeof React.Component | React.LazyExoticComponent<React.ComponentType>;

interface SuspendedProps {
    path: string;
    component: SuspendedComponent;
    requireAuth?: boolean;
    extraProps?: object;
}

const isLoggedIn = (): boolean => !!localStorage.token;

const SuspendedRoute: React.FC<SuspendedProps> = ({ path, component: Component, requireAuth, extraProps }): React.ReactElement => (
    <Route
        path={path}
        render={(props: RouteProps): React.ReactElement =>
            !requireAuth || isLoggedIn() ? (
                <React.Suspense fallback={<div className="wrapper text-center">Loading...</div>}>
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
