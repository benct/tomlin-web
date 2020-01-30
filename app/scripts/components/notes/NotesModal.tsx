import React from 'react';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiCloseCircleOutline, mdiContentSaveOutline, mdiDeleteOutline } from '@mdi/js';

import { Note, ThunkDispatchProp } from '../../interfaces';
import { deleteNote, saveNote } from '../../actions/admin';

import Modal from '../page/Modal';

interface NotesModalProps {
    close: () => void;
    note: Note;
}

const NotesModal: React.FC<NotesModalProps & ThunkDispatchProp> = ({ note, close, dispatch }) => {
    const title = React.useRef<HTMLInputElement>(null);
    const content = React.useRef<HTMLTextAreaElement>(null);

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
            <input
                className="input"
                type="text"
                maxLength={64}
                placeholder="Title"
                autoComplete="off"
                required
                ref={title}
                defaultValue={note.title}
            />
            <textarea
                className="input-textarea monospace"
                rows={20}
                placeholder="Notes..."
                autoComplete="off"
                wrap="off"
                ref={content}
                defaultValue={note.content}
            />
            <div>
                {note.id ? (
                    <button className="button-icon mrm" onClick={remove}>
                        <Icon path={mdiDeleteOutline} size="28px" title="Delete" />
                    </button>
                ) : null}
                <button className="button-icon" onClick={save}>
                    <Icon path={mdiContentSaveOutline} size="28px" title="Save" />
                </button>
                <button className="button-icon float-right" onClick={close}>
                    <Icon path={mdiCloseCircleOutline} size="28px" title="Cancel" />
                </button>
            </div>
        </Modal>
    );
};

export default connect()(NotesModal);
