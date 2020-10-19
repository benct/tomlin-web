import { ReactNode, Suspense } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { Loading } from '../page/Loading';

interface SuspendedRouteProps {
    authentication?: boolean;
}

const isLoggedIn = (): boolean => !!localStorage.getItem('token');

export class SuspendedRoute extends Route<SuspendedRouteProps & RouteProps> {
    render(): ReactNode {
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

        return <Suspense fallback={<Loading isLoading className="wrapper min-height" />}>{super.render()}</Suspense>;
    }
}
