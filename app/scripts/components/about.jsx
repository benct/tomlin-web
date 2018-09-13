import React from 'react';

export default function About() {
    return (
        <div className="wrapper text">
            {`There's really not that much interesting here...`}
            <br />
            {`This site was developed a while back using `}
            <a href="https://facebook.github.io/react/" target="_blank" rel="noopener noreferrer">
                React
            </a>
            {`, built with `}
            <a href="https://webpack.github.io/" target="_blank" rel="noopener noreferrer">
                Webpack
            </a>
            {`, `}
            <a href="https://babeljs.io/" target="_blank" rel="noopener noreferrer">
                Babel
            </a>
            {` and `}
            <a href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer">
                Node/NPM
            </a>
            {`, for the purpose of learning and testing it out. `}
            {`For more information about me, feel free to follow the social links at the bottom of this page.`}
            <br />
            <br />
            Version 2.4
        </div>
    );
}
