import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from '../../route/private.jsx';
import Navigation from '../page/navigation.jsx';
import Error from '../page/error.jsx';
import MediaList from './mediaList.jsx';
import Search from './search.jsx';

export default class Media extends React.Component {
    render() {
        return (
            <>
                <Navigation type="media" loggedIn={this.props.loggedIn} />
                <div className="wrapper ptm">
                    <Switch>
                        <Route path="/media" exact render={() => <Redirect to="/media/movie" />} />
                        <Route
                            path="/media/:type(movie|tv|watchlist)/:page?"
                            render={props => <MediaList {...props} loggedIn={this.props.loggedIn} showToast={this.props.showToast} />}
                        />
                        <PrivateRoute
                            path="/media/admin/:type?/:action?/:page?"
                            render={props => <Search {...props} showToast={this.props.showToast} />}
                        />
                        <Route render={() => <Error code={404} />} />
                    </Switch>
                </div>
            </>
        );
    }
}

Media.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    showToast: PropTypes.func.isRequired,
};
