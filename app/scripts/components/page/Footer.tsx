import React from 'react';
import { Action } from 'redux';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiAt, mdiFacebook, mdiGithubCircle, mdiInstagram, mdiLinkedin } from '@mdi/js';

import { ThunkDispatchProp } from '../../interfaces';
import actions from '../../actions/base';

const Footer: React.FC<ThunkDispatchProp> = ({ dispatch }): React.ReactElement => (
    <footer className="color-bg">
        <div className="social text-center">
            <a href="https://github.com/benct" target="_blank" rel="noopener noreferrer">
                <Icon path={mdiGithubCircle} size={1} title="GitHub" className="valign-middle color-secondary" />
            </a>
            <a href="https://www.facebook.com/ben.c.tomlin" target="_blank" rel="noopener noreferrer">
                <Icon path={mdiFacebook} size={1} title="Facebook" className="valign-middle color-secondary" />
            </a>
            <a href="https://www.instagram.com/benctomlin" target="_blank" rel="noopener noreferrer">
                <Icon path={mdiInstagram} size={1} title="Instagram" className="valign-middle color-secondary" />
            </a>
            <a href="https://www.linkedin.com/in/bentomlin" target="_blank" rel="noopener noreferrer">
                <Icon path={mdiLinkedin} size={1} title="LinkedIn" className="valign-middle color-secondary" />
            </a>
            <a href="mailto:ben@tomlin.no" target="_blank" rel="noopener noreferrer">
                <Icon path={mdiAt} size={1} title="E-mail" className="valign-middle color-secondary" />
            </a>
        </div>
        <div className="text mtl">
            <span
                className="pointer no-select color-offset"
                onClick={(): Action => dispatch(actions.toggleTheme())}
                role="button"
                tabIndex={-1}>
                Ben Tomlin © 2019
            </span>
        </div>
    </footer>
);

export default connect()(React.memo(Footer));
