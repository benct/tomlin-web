import React from 'react';

export default function Me() {
    return (
        <div className="wrapper text">
            <div className="cv-header">Ben Christopher Tomlin</div>

            <div className="cv-position">
                <span className="cv-title">Senior Developer at FINN.no</span>
                <br />
                <span className="cv-title">Full-stack Developer</span>
                <br />
                Oslo, Norway
            </div>

            <div className="cv-skills-wrapper">
                <div className="cv-skills">
                    <div className="strong">Day-to-day</div>
                    <ul>
                        <li>Java</li>
                        <li>Kotlin</li>
                        <li>JavaScript / TypeScript</li>
                        <li>React.js / JSX</li>
                        <li>Webpack / Babel / Node.js</li>
                        <li>NPM / Yarn</li>
                        <li>HTML5 / CSS3 / JSON / XML</li>
                        <li>Spring / Spring Boot</li>
                        <li>PostgreSQL / MySQL / Sybase</li>
                        <li>Version Control / Git</li>
                    </ul>
                </div>
                <div className="cv-skills">
                    <div className="strong">Experience with</div>
                    <ul>
                        <li>PHP</li>
                        <li>C / C++</li>
                        <li>Ruby</li>
                        <li>Python</li>
                        <li>Apache / Tomcat</li>
                        <li>Docker / Kubernetes</li>
                    </ul>
                </div>
            </div>

            <div>See more through social links below</div>
        </div>
    );
}
