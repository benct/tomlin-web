import useSWR, { useSWRConfig } from 'swr';
import { useState } from 'react';
import { useToast } from './base';
import { useAppContext } from './context';
import { del, get, post } from '../util/api';
import { Note } from '../interfaces';

export const useNotes = () => {
    const { isLoggedIn } = useAppContext();
    const { data, error } = useSWR<Note[], Error>(isLoggedIn ? '/note' : null, get, { revalidateOnFocus: false });

    useToast(error && 'Could not fetch notes...');

    return { notes: data ?? [], loading: !data && !error };
};

export const useNoteActions = () => {
    const { mutate } = useSWRConfig();
    const { isLoggedIn } = useAppContext();
    const [toast, setToast] = useState<string>();

    useToast(toast);

    const saveNote = (id: number | undefined, title: string, content: string) => {
        if (isLoggedIn) {
            setToast(undefined);
            post('/note', { id, title, content })
                .then(() => {
                    setToast('Successfully saved note!');
                    mutate('/note');
                })
                .catch(() => setToast('Could not save note...'));
        }
    };

    const deleteNote = (id: number) => {
        if (isLoggedIn && confirm('Are you sure you want to delete this note?')) {
            setToast(undefined);
            del(`/note/${id}`)
                .then(() => {
                    setToast('Successfully deleted note!');
                    mutate('/note');
                })
                .catch(() => setToast('Could not delete note...'));
        }
    };

    return { saveNote, deleteNote };
};
