import React from 'react';

interface SocialProps {
    circle: boolean;
}

const Social: React.FC<SocialProps> = ({ circle }): React.ReactElement => {
    const prefix = circle ? 'circle-' : '';
    return (
        <div className={`social${circle ? ' large' : ''}`}>
            <a href="https://github.com/benct" target="_blank" rel="noopener noreferrer">
                <img src={require(`../../../images/social/${prefix}github.svg`)} alt="github" />
            </a>
            <a href="https://www.facebook.com/ben.c.tomlin" target="_blank" rel="noopener noreferrer">
                <img src={require(`../../../images/social/${prefix}facebook.svg`)} alt="facebook" />
            </a>
            <a href="https://www.instagram.com/benctomlin" target="_blank" rel="noopener noreferrer">
                <img src={require(`../../../images/social/${prefix}instagram.svg`)} alt="instagram" />
            </a>
            <a href="https://www.linkedin.com/in/bentomlin" target="_blank" rel="noopener noreferrer">
                <img src={require(`../../../images/social/${prefix}linkedin.svg`)} alt="linkedin" />
            </a>
            <a href="mailto:ben@tomlin.no" target="_blank" rel="noopener noreferrer">
                <img src={require(`../../../images/social/${prefix}email.svg`)} alt="email" />
            </a>
        </div>
    );
};

export default React.memo(Social);
