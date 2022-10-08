import { FC } from 'react';
import { Icon } from '@mdi/react';
import { mdiMapMarkerOutline } from '@mdi/js';

import { Box } from '@/components/page/Box';
import { GitHub } from './GitHub';

export const About: FC = () => (
    <>
        <Box title="Ben Tomlin" border="border-b" className="text-center">
            <div>
                Senior Developer at{' '}
                <a href="https://finn.no" rel="noreferrer" className="text-secondary dark:text-secondary-dark">
                    FINN.no
                </a>
            </div>
            <div>Full Stack Developer</div>
            <div className="flex justify-center gap-x-8 pt-16 pb-32">
                <Icon path={mdiMapMarkerOutline} size={1} />
                <span className="text-neutral dark:text-neutral-dark">Oslo, Norway</span>
            </div>
            <div className="grid grid-cols-2 gap-16 max-w-max mx-auto">
                <div className="text-left text-14 align-top">
                    <div className="text-secondary dark:text-secondary-dark underline pb-8">Day-to-day</div>
                    <ul className="space-y-8">
                        <li>Java / Kotlin</li>
                        <li>JavaScript / TypeScript</li>
                        <li>React / Redux / Next</li>
                        <li>Node / NPM / Yarn</li>
                        <li>HTML / CSS / JSON / XML</li>
                        <li>Spring / Spring Boot</li>
                        <li>PostgreSQL / MySQL</li>
                    </ul>
                </div>
                <div className="text-left text-14 align-top">
                    <div className="text-secondary dark:text-secondary-dark underline pb-8">Experience with</div>
                    <ul className="space-y-8">
                        <li>Python</li>
                        <li>PHP</li>
                        <li>Ruby</li>
                        <li>C / C++</li>
                        <li>Apache / Nginx</li>
                        <li>Docker / Kubernetes</li>
                    </ul>
                </div>
            </div>
        </Box>
        <GitHub />
    </>
);
