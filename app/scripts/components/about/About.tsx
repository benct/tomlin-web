import React from 'react';
import Icon from '@mdi/react';
import { mdiMapMarkerOutline } from '@mdi/js';

import GitHub from './GitHub';

import '../../../styles/about.css';

const About: React.FC = () => (
    <>
        <div className="wrapper text">
            <div className="cv-header color-primary">Ben Christopher Tomlin</div>

            <div className="mbm">
                <div>
                    Senior Developer at <a href="https://finn.no">FINN.no</a>
                </div>
                <div>Full Stack Developer</div>
                <div className="mtm">
                    <Icon path={mdiMapMarkerOutline} size={1} className="text-icon" />
                    <span className="valign-middle mrm color-offset">Oslo, Norway</span>
                </div>
            </div>

            <div>
                <div className="cv-skills">
                    <div className="color-primary underline">Day-to-day</div>
                    <ul>
                        <li>Java / Kotlin</li>
                        <li>JavaScript / TypeScript</li>
                        <li>React.js / JSX</li>
                        <li>Node.js / NPM / Yarn</li>
                        <li>Webpack / Babel</li>
                        <li>HTML5 / CSS3 / JSON / XML</li>
                        <li>Spring / Spring Boot</li>
                        <li>PostgreSQL / MySQL / Sybase</li>
                    </ul>
                </div>
                <div className="cv-skills">
                    <div className="color-primary underline">Experience with</div>
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
        </div>
        <hr />
        <GitHub />
    </>
);

export default React.memo(About);
