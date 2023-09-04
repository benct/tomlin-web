import { memo, useRef } from 'react';
import { mdiContentSaveOutline, mdiDeleteOutline } from '@mdi/js';

import { useNoteActions } from '@/data/notes';

import { Note } from '@/interfaces';
import { Modal } from '@/components/page/Modal';
import { Button } from '@/components/page/Button';

interface NotesModalProps {
    close: () => void;
    note: Note;
}

export const NotesModal = memo(({ note, close }: NotesModalProps) => {
    const title = useRef<HTMLInputElement>(null);
    const content = useRef<HTMLTextAreaElement>(null);

    const { saveNote, deleteNote } = useNoteActions();

    const save = (): void => {
        if (!content.current || !title.current?.value?.length) {
            return;
        }
        saveNote(note.id, title.current.value, content.current.value);
        close();
    };

    const remove = (): void => {
        if (note.id) {
            deleteNote(note.id);
            close();
        }
    };

    return (
        <Modal
            title={`${note.id ? 'Edit' : 'New'} Note`}
            close={close}
            left={note.id ? <Button text="Delete" icon={mdiDeleteOutline} onClick={remove} /> : null}
            right={<Button text="Save" icon={mdiContentSaveOutline} onClick={save} />}
            className="space-y-16">
            <label className="label">
                Title
                <input
                    className="input w-full"
                    type="text"
                    maxLength={64}
                    autoComplete="off"
                    required
                    ref={title}
                    defaultValue={note.title}
                />
            </label>
            <label className="label">
                Content
                <textarea
                    className="input w-full font-mono text-14"
                    rows={18}
                    placeholder="Notes..."
                    autoComplete="off"
                    wrap="off"
                    ref={content}
                    defaultValue={note.content}
                />
            </label>
        </Modal>
    );
});

NotesModal.displayName = 'NotesModal';
