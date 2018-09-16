import React from 'react';

export default function Me() {
    return (
        <div className="wrapper text">
            <div className="cv-header color-primary">Ben Christopher Tomlin</div>

            <div className="cv-position">
                <span>Senior Developer at FINN.no</span>
                <br />
                <span>Full-stack Developer</span>
                <br />
                <span className="color-light">Oslo, Norway</span>
            </div>

            <div>
                <div className="cv-skills">
                    <div className="color-primary strong">Day-to-day</div>
                    <ul>
                        <li>Java / Kotlin</li>
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
                    <div className="color-primary strong">Experience with</div>
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

            <div>See more through social links below.</div>
        </div>
    );
}
