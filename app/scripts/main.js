import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import Home from './views/home.jsx';
import About from './views/about.jsx';
import Error from './views/error.jsx';
import Social from './components/social.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            circleIcons: false
        };
    }

    toggleIcons() {
        this.setState({
            circleIcons: !this.state.circleIcons
        });
    }

    render() {
        return (
            <div className="borders">
                <header>
                    <img className="menu" src={require('../images/menu.svg')} alt="Menu" onClick={this.toggleIcons.bind(this)} />
                </header>
                <div className="content">
                    { this.props.children }
                </div>
                <footer>
                    <Social circle={ this.state.circleIcons }/>
                </footer>
            </div>
        );
    }
}

ReactDOM.render(
    <Router history={ browserHistory }>
        <Route path='/' component={ App }>
            <IndexRoute component={ Home } />
            <Route path='about' component={ About } />
        </Route>
        <Route path="*" component={ Error } code={ 404 } />
    </Router>,
    document.getElementById('root')
);