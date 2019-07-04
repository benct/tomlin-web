import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';

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
                <React.Suspense
                    fallback={
                        <div className="wrapper text">
                            <Icon path={mdiLoading} size={1} title="Loading" spin={1} className="text-icon" />
                            <span className="valign-middle">Loading...</span>
                        </div>
                    }>
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
