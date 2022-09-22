import { FC, memo } from 'react';
import { Icon } from '@mdi/react';
import { mdiCloseCircleOutline, mdiGithub } from '@mdi/js';

import { Modal, ModalContent, ModalFooter, ModalHeader } from '../page/Modal';

interface ChangelogProps {
    close: () => void;
}

export const Changelog: FC<ChangelogProps> = memo(({ close }) => (
    <Modal close={close}>
        <ModalHeader>Changelog</ModalHeader>
        <ModalContent>
            <div className="changelog">Changelog view has been disabled. Please view on GitHub instead.</div>
        </ModalContent>
        <ModalFooter>
            <a href="https://github.com/benct/tomlin-web/blob/master/CHANGELOG.md" target="_blank" rel="noopener noreferrer">
                <Icon path={mdiGithub} size="28px" title="View on GitHub" className="valign-middle" id="githubViewIcon" />
                <span className="valign-middle mlm">View on GitHub</span>
            </a>
            <button className="button-icon float-right" onClick={close}>
                <Icon path={mdiCloseCircleOutline} size="28px" title="Close" id="closeIcon" />
            </button>
        </ModalFooter>
    </Modal>
));

Changelog.displayName = 'Changelog';
export default Changelog;
