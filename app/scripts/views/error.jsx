import React from 'react';
import PropTypes from 'prop-types';

const error = {
    403: {
        title: "Forbidden",
        message: "Sorry, but you don't have permission to access this place on our server."
    },
    404: {
        title: "Page Not Found",
        message: "Sorry, but the page you were trying to view does not exist."
    },
    500: {
        title: "Internal Server Error",
        message: "Shit's gone down..."
    }
};

export default class Error extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.title += (' - ' + error[this.props.route.code].title);
        document.body.classList.add('error-page');
    }

    componentWillUnmount() {
        document.body.classList.remove('error-page');
    }

    render() {
        return (
            <div>
                <h1>{ error[this.props.route.code].title }</h1>
                <p>{ error[this.props.route.code].message }</p>
            </div>
        );
    }
}

Error.propTypes = {
    route: PropTypes.object.isRequired
};