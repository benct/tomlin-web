import { FC, ReactElement, useState } from 'react';
import { Icon } from '@mdi/react';
import { mdiFileDocumentMultipleOutline } from '@mdi/js';

import { useNotes } from '../../data/notes';

import { Note } from '../../interfaces';
import { Loading } from '../page/Loading';
import { NotesModal } from './NotesModal';

export const Notes: FC = () => {
    const [showOverlay, setShowOverlay] = useState<boolean>(false);
    const [selected, setSelected] = useState<Note>();

    const { notes, loading } = useNotes();

    const edit = (note: Note): void => {
        setShowOverlay(true);
        setSelected(note);
    };

    const closeModal = (): void => {
        setShowOverlay(false);
        setSelected(undefined);
    };

    return (
        <div className="wrapper min-height ptm">
            <Loading isLoading={loading} text="Loading notes...">
                {notes.length ? (
                    notes.map(
                        (note: Note): ReactElement => (
                            <div className="admin-logs admin-note" key={`note${note.id}`}>
                                <code>
                                    {note.updated}
                                    <br />
                                    <button className="button-blank text-left strong mts" onClick={(): void => edit(note)}>
                                        {note.title ?? 'No title'}
                                    </button>
                                </code>
                                <pre style={{ whiteSpace: 'pre-wrap' }}>{note.content ?? 'No content...'}</pre>
                            </div>
                        )
                    )
                ) : (
                    <div className="text">No notes found...</div>
                )}
            </Loading>
            <div className="text-center">
                <button className="button-icon button-icon-text" onClick={(): void => edit({})}>
                    New note <Icon path={mdiFileDocumentMultipleOutline} size="28px" title="New" />
                </button>
            </div>
            {showOverlay && selected ? <NotesModal note={selected} close={closeModal} /> : null}
        </div>
    );
};
