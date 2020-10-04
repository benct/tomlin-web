import React from 'react';
import Icon from '@mdi/react';
import { mdiCloseCircleOutline, mdiGithub } from '@mdi/js';

import content from '../../../../CHANGELOG.md';
import Modal from '../page/Modal';

interface ChangelogProps {
    close: () => void;
}

const Changelog: React.FC<ChangelogProps> = ({ close }) => (
    <Modal close={close}>
        <div className="overlay-modal-content changelog" dangerouslySetInnerHTML={{ __html: content }} />
        <div className="border-top ptm">
            <a href="https://github.com/benct/tomlin-web/blob/master/CHANGELOG.md" target="_blank" rel="noopener noreferrer">
                <Icon path={mdiGithub} size="28px" title="View on GitHub" className="valign-middle" />
                <span className="valign-middle mlm">View on GitHub</span>
            </a>
            <button className="button-icon float-right" onClick={close}>
                <Icon path={mdiCloseCircleOutline} size="28px" title="Close" />
            </button>
        </div>
    </Modal>
);

export default React.memo(Changelog);
