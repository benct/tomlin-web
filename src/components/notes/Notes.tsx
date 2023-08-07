import { FC, ReactElement, useState } from 'react';

import { formatTimestamp } from '@/util/formatting';
import { useNotes } from '@/data/notes';

import { Note } from '@/interfaces';
import { Loading } from '@/components/page/Loading';
import { Button } from '@/components/page/Button';
import { Box } from '@/components/page/Box';
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
        <Box title="Notes" className="min-h">
            <Loading isLoading={loading} text="Loading notes...">
                {notes.length ? (
                    notes.map(
                        (note: Note): ReactElement => (
                            <div
                                className="grid sm:grid-cols-auto-1fr gap-16 border-b border-dashed pb-16 mb-16 text-14"
                                key={`note${note.id}`}>
                                <code>
                                    {formatTimestamp(note.updated)}
                                    <br />
                                    <button className="text-left font-bold mt-4" onClick={(): void => edit(note)}>
                                        {note.title ?? 'No title'}
                                    </button>
                                </code>
                                <pre style={{ whiteSpace: 'pre-wrap' }} className="overflow-x-auto">
                                    {note.content ?? 'No content...'}
                                </pre>
                            </div>
                        ),
                    )
                ) : (
                    <div className="text-center">No notes found...</div>
                )}
                <Button text="New" onClick={(): void => edit({})} className="block mx-auto mt-16" />
            </Loading>
            {showOverlay && selected ? <NotesModal note={selected} close={closeModal} /> : null}
        </Box>
    );
};
