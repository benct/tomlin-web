import React from 'react';

export default function About() {
    return (
        <div className="wrapper text">
            There&apos;s really not that much interesting here...<br/>This site was developed a while back
            using <a href="https://facebook.github.io/react/" target="_blank" rel="noopener noreferrer">React</a> in conjunction
            with <a href="https://webpack.github.io/" target="_blank" rel="noopener noreferrer">Webpack</a>,&nbsp;
            <a href="https://babeljs.io/" target="_blank" rel="noopener noreferrer">Babel</a> and&nbsp;
            <a href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer">Node/NPM</a>,
            for the purpose of learning and testing it out. For more information about me, feel free to
            follow the social links at the bottom of the page.<br/><br/>
            Recently released version 2.0 of this site, while also upgrading to latest versions of React, ESlint, Babel, Webpack and more.
        </div>
    );
}