import React from 'react';

interface ErrorProps {
    code: number;
}

interface ErrorType {
    title: string;
    message: string;
}

const error: { [key: number]: ErrorType } = {
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

export default class Error extends React.PureComponent<ErrorProps> {
    title: string;

    constructor(props: ErrorProps) {
        super(props);

        this.title = document.title;
    }

    componentDidMount(): void {
        document.title += ` - ${error[this.props.code].title}`;
    }

    componentWillUnmount(): void {
        document.title = this.title;
    }

    render(): React.ReactElement {
        return (
            <div className="wrapper error-page">
                <h1 className="color-primary">{error[this.props.code].title}</h1>
                <p>{error[this.props.code].message}</p>
            </div>
        );
    }
}
