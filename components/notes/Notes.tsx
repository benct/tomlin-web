import { FC, ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@mdi/react';
import { mdiFileDocumentMultipleOutline } from '@mdi/js';

import { DefaultState, Note } from '../../interfaces';
import { getNotes } from '../../actions/admin';

import { Loading } from '../page/Loading';
import { NotesModal } from './NotesModal';

export const Notes: FC = () => {
    const [showOverlay, setShowOverlay] = useState<boolean>(false);
    const [selected, setSelected] = useState<Note>();

    const dispatch = useDispatch();
    const loading = useSelector<DefaultState, DefaultState['loading']>((state) => state.loading);
    const notes = useSelector<DefaultState, Note[]>((state) => state.admin.notes);

    useEffect(() => {
        if (!notes.length) {
            dispatch(getNotes());
        }
    }, [dispatch, notes]);

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
