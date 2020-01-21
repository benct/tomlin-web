import React from 'react';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiFileDocumentBoxPlusOutline } from '@mdi/js';

import { DefaultState, Note, ThunkDispatchProp } from '../../interfaces';
import { getNotes } from '../../actions/admin';

import NotesModal from './NotesModal';

interface NotesProps {
    notes?: Note[];
    isLoggedIn: boolean;
}

const Notes: React.FC<NotesProps & ThunkDispatchProp> = ({ notes, isLoggedIn, dispatch }) => {
    const [showOverlay, setShowOverlay] = React.useState<boolean>(false);
    const [selected, setSelected] = React.useState<Note>();

    React.useEffect(() => {
        if (!notes || !notes.length) {
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
            {notes && notes.length ? (
                notes.map(
                    (note: Note): React.ReactElement => (
                        <div className="admin-logs admin-note" key={`note${note.id}`}>
                            <code>
                                {note.updated}
                                <br />
                                <button className="button-blank text-left strong mts" onClick={(): void => edit(note)}>
                                    {note.title || 'No title'}
                                </button>
                            </code>
                            <pre style={{ whiteSpace: 'pre-wrap' }}>{note.content || 'No content...'}</pre>
                        </div>
                    )
                )
            ) : (
                <div className="text">No notes found...</div>
            )}
            <div className="text-center">
                <button className="button-icon button-icon-text" onClick={(): void => edit({})}>
                    New note <Icon path={mdiFileDocumentBoxPlusOutline} size="28px" title="New" />
                </button>
            </div>
            {showOverlay && selected ? <NotesModal note={selected} close={closeModal} /> : null}
        </>
    );
};

export default connect((state: DefaultState): NotesProps => ({ notes: state.admin.notes, isLoggedIn: state.auth.isLoggedIn }))(Notes);
