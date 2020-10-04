import React, { memo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from '@mdi/react';
import { mdiCloseCircleOutline, mdiContentSaveOutline, mdiDeleteOutline } from '@mdi/js';

import { Note } from '../../interfaces';
import { deleteNote, saveNote } from '../../actions/admin';

import { Modal, ModalContent, ModalFooter, ModalHeader } from '../page/Modal';

interface NotesModalProps {
    close: () => void;
    note: Note;
}

export const NotesModal: React.FC<NotesModalProps> = memo(({ note, close }) => {
    const title = useRef<HTMLInputElement>(null);
    const content = useRef<HTMLTextAreaElement>(null);
    const dispatch = useDispatch();

    const save = (): void => {
        if (!content.current || !title.current?.value?.length) {
            return;
        }
        dispatch(saveNote(note.id, title.current.value, content.current.value));
        close();
    };

    const remove = (): void => {
        if (note.id) {
            dispatch(deleteNote(note.id));
            close();
        }
    };

    return (
        <Modal close={close}>
            <ModalHeader>{`${note.id ? 'Edit' : 'New'} Note`}</ModalHeader>
            <ModalContent>
                <input
                    className="input full-width"
                    type="text"
                    maxLength={64}
                    placeholder="Title"
                    autoComplete="off"
                    required
                    ref={title}
                    defaultValue={note.title}
                />
                <textarea
                    className="input-textarea full-width monospace"
                    rows={18}
                    placeholder="Notes..."
                    autoComplete="off"
                    wrap="off"
                    ref={content}
                    defaultValue={note.content}
                />
            </ModalContent>
            <ModalFooter>
                {note.id ? (
                    <button className="button-icon mrl" onClick={remove}>
                        <Icon path={mdiDeleteOutline} size="28px" title="Delete" />
                    </button>
                ) : null}
                <button className="button-icon" onClick={save}>
                    <Icon path={mdiContentSaveOutline} size="28px" title="Save" />
                </button>
                <button className="button-icon float-right" onClick={close}>
                    <Icon path={mdiCloseCircleOutline} size="28px" title="Cancel" />
                </button>
            </ModalFooter>
        </Modal>
    );
});

NotesModal.displayName = 'NotesModal';
