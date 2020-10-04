import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { Loading } from '../page/Loading';

interface SuspendedRouteProps {
    authentication?: boolean;
}

const isLoggedIn = (): boolean => !!localStorage.getItem('token');

export class SuspendedRoute extends Route<SuspendedRouteProps & RouteProps> {
    render(): React.ReactNode {
        if (this.props.authentication && !isLoggedIn()) {
            return (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: this.props.location },
                    }}
                />
            );
        }

        return <React.Suspense fallback={<Loading isLoading className="wrapper min-height" />}>{super.render()}</React.Suspense>;
    }
}
