import { FC, memo } from 'react';
import { Icon } from '@mdi/react';
import { mdiAt, mdiFacebook, mdiGithub, mdiInstagram, mdiLinkedin } from '@mdi/js';

export const Footer: FC = memo(() => (
    <footer className="color-bg">
        <div className="social text-center">
            <a href="https://github.com/benct" target="_blank" rel="noopener noreferrer">
                <Icon path={mdiGithub} size={1} title="GitHub" className="valign-middle" />
            </a>
            <a href="https://www.facebook.com/ben.c.tomlin" target="_blank" rel="noopener noreferrer">
                <Icon path={mdiFacebook} size={1} title="Facebook" className="valign-middle" />
            </a>
            <a href="https://www.instagram.com/benctomlin" target="_blank" rel="noopener noreferrer">
                <Icon path={mdiInstagram} size={1} title="Instagram" className="valign-middle" />
            </a>
            <a href="https://www.linkedin.com/in/bentomlin" target="_blank" rel="noopener noreferrer">
                <Icon path={mdiLinkedin} size={1} title="LinkedIn" className="valign-middle" />
            </a>
            <a href="mailto:ben@tomlin.no" target="_blank" rel="noopener noreferrer">
                <Icon path={mdiAt} size={1} title="E-mail" className="valign-middle" />
            </a>
        </div>
        <div className="text color-offset no-select mtl">Ben Tomlin © 2020</div>
    </footer>
));

Footer.displayName = 'Footer';
