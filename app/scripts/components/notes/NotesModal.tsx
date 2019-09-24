import React, { RefObject } from 'react';
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

class NotesModal extends React.PureComponent<NotesModalProps & ThunkDispatchProp> {
    title: RefObject<HTMLInputElement>;
    content: RefObject<HTMLTextAreaElement>;

    constructor(props: NotesModalProps & ThunkDispatchProp) {
        super(props);

        this.title = React.createRef();
        this.content = React.createRef();
    }

    save(): void {
        if (
            !this.props.note.id ||
            !this.title.current ||
            !this.content.current ||
            !this.title.current.value ||
            !this.title.current.value.length
        )
            return;

        this.props.dispatch(saveNote(this.props.note.id, this.title.current.value, this.content.current.value));
        this.props.close();
    }

    delete(): void {
        if (this.props.note.id) {
            this.props.dispatch(deleteNote(this.props.note.id));
            this.props.close();
        }
    }

    render(): React.ReactElement {
        return (
            <Modal close={this.props.close}>
                <input
                    className="input"
                    type="text"
                    maxLength={64}
                    placeholder="Title"
                    autoComplete="off"
                    required
                    ref={this.title}
                    defaultValue={this.props.note.title}
                />
                <textarea
                    className="input-textarea monospace"
                    rows={20}
                    placeholder="Notes..."
                    autoComplete="off"
                    wrap="off"
                    ref={this.content}
                    defaultValue={this.props.note.content}
                />
                <div>
                    {this.props.note.id ? (
                        <button className="button-icon mrm" onClick={this.delete.bind(this)}>
                            <Icon path={mdiDeleteOutline} size="28px" title="Delete" />
                        </button>
                    ) : null}
                    <button className="button-icon" onClick={this.save.bind(this)}>
                        <Icon path={mdiContentSaveOutline} size="28px" title="Save" />
                    </button>
                    <button className="button-icon float-right" onClick={this.props.close}>
                        <Icon path={mdiCloseCircleOutline} size="28px" title="Cancel" />
                    </button>
                </div>
            </Modal>
        );
    }
}

export default connect()(NotesModal);
