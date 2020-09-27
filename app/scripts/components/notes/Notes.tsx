import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@mdi/react';
import { mdiFileDocumentMultipleOutline } from '@mdi/js';

import { DefaultState, Note } from '../../interfaces';
import { getNotes } from '../../actions/admin';

import NotesModal from './NotesModal';
import Loading from '../page/Loading';

interface NotesState {
    notes: Note[];
    loading: boolean;
    isLoggedIn: boolean;
}

const Notes: React.FC = () => {
    const [showOverlay, setShowOverlay] = useState<boolean>(false);
    const [selected, setSelected] = useState<Note>();

    const dispatch = useDispatch();
    const { notes, loading, isLoggedIn } = useSelector<DefaultState, NotesState>((state) => ({
        notes: state.admin.notes,
        loading: state.loading,
        isLoggedIn: state.auth.isLoggedIn,
    }));

    useEffect(() => {
        if (!notes.length) {
            dispatch(getNotes());
        }
    }, [isLoggedIn]);

    const edit = (note: Note): void => {
        setShowOverlay(true);
        setSelected(note);
    };

    const closeModal = (): void => {
        setShowOverlay(false);
        setSelected(undefined);
    };

    return (
        <>
            <Loading isLoading={loading} text="Loading notes...">
                {notes.length ? (
                    notes.map(
                        (note: Note): React.ReactElement => (
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
        </>
    );
};

export default Notes;
