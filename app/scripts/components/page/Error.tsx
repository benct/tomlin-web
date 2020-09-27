import React, { useEffect } from 'react';

import '../../../styles/error.css';

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

const Error: React.FC<ErrorProps> = ({ code }) => {
    const title: string = document.title;

    useEffect(() => {
        document.title += ` - ${error[code].title}`;

        return (): void => {
            document.title = title;
        };
    }, []);

    return (
        <div className="wrapper error-page">
            <h1 className="color-primary">{error[code].title}</h1>
            <p>{error[code].message}</p>
        </div>
    );
};

export default React.memo(Error);
