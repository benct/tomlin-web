import React from 'react';
import PropTypes from 'prop-types';

const error = {
    403: {
        title: 'Forbidden',
        message: "Sorry, but you don't have permission to access this place on our server.",
    },
    404: {
        title: 'Page Not Found',
        message: 'Sorry, but the page you were trying to view does not exist.',
    },
    500: {
        title: 'Internal Server Error',
        message: "Shit's gone down...",
    },
};

export default class Error extends React.PureComponent {
    constructor(props) {
        super(props);

        this.title = document.title;
    }

    componentDidMount() {
        document.title += ` - ${error[this.props.code].title}`;
    }

    componentWillUnmount() {
        document.title = this.title;
    }

    render() {
        return (
            <div className="wrapper error-page">
                <h1 className="color-primary">{error[this.props.code].title}</h1>
                <p>{error[this.props.code].message}</p>
            </div>
        );
    }
}

Error.propTypes = {
    code: PropTypes.number.isRequired,
};
