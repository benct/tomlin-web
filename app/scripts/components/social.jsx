import React from 'react';

export default function Social(props) {
    const circle = props.circle ? 'circle-' : '';
    return (
        <div className={'social' + (props.circle ? ' large' : '')}>
            <a href="https://www.facebook.com/ben.c.tomlin" target="_blank">
                <img src={require("../../images/social/" + circle + "facebook.svg")} alt="facebook" />
            </a>
            <a href="https://www.instagram.com/benctomlin" target="_blank">
                <img src={require("../../images/social/" + circle + "instagram.svg")} alt="instagram" />
            </a>
            <a href="https://www.linkedin.com/in/bentomlin" target="_blank">
                <img src={require("../../images/social/" + circle + "linkedin.svg")} alt="linkedin" />
            </a>
            <a href="https://github.com/benct" target="_blank">
                <img src={require("../../images/social/" + circle + "github.svg")} alt="github" />
            </a>
            <a href="mailto:ben@tomlin.no" target="_blank">
                <img src={require("../../images/social/" + circle + "email.svg")} alt="email" />
            </a>
        </div>
    );
}
