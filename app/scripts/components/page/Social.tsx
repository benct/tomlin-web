import React from 'react';
import Icon from '@mdi/react';
import { mdiAt, mdiFacebook, mdiGithubCircle, mdiInstagram, mdiLinkedin } from '@mdi/js';

interface SocialProps {
    circle: boolean;
}

const Social: React.FC<SocialProps> = ({ circle }): React.ReactElement => (
    <div className="social text-center">
        <a href="https://github.com/benct" target="_blank" rel="noopener noreferrer">
            {circle ? (
                <img src={require(`../../../images/social/circle-github.svg`)} alt="GitHub" />
            ) : (
                <Icon path={mdiGithubCircle} size={1} title="GitHub" className="valign-middle color-secondary" />
            )}
        </a>
        <a href="https://www.facebook.com/ben.c.tomlin" target="_blank" rel="noopener noreferrer">
            {circle ? (
                <img src={require(`../../../images/social/circle-facebook.svg`)} alt="Facebook" />
            ) : (
                <Icon path={mdiFacebook} size={1} title="Facebook" className="valign-middle color-secondary" />
            )}
        </a>
        <a href="https://www.instagram.com/benctomlin" target="_blank" rel="noopener noreferrer">
            {circle ? (
                <img src={require(`../../../images/social/circle-instagram.svg`)} alt="Instagram" />
            ) : (
                <Icon path={mdiInstagram} size={1} title="Instagram" className="valign-middle color-secondary" />
            )}
        </a>
        <a href="https://www.linkedin.com/in/bentomlin" target="_blank" rel="noopener noreferrer">
            {circle ? (
                <img src={require(`../../../images/social/circle-linkedin.svg`)} alt="Linkedin" />
            ) : (
                <Icon path={mdiLinkedin} size={1} title="LinkedIn" className="valign-middle color-secondary" />
            )}
        </a>
        <a href="mailto:ben@tomlin.no" target="_blank" rel="noopener noreferrer">
            {circle ? (
                <img src={require(`../../../images/social/circle-email.svg`)} alt="E-mail" />
            ) : (
                <Icon path={mdiAt} size={1} title="E-mail" className="valign-middle color-secondary" />
            )}
        </a>
    </div>
);

export default React.memo(Social);
