import React, { RefObject } from 'react';
import { connect, DispatchProp } from 'react-redux';
import Icon from '@mdi/react';
import { mdiCloseCircleOutline, mdiContentSaveOutline, mdiDeleteOutline } from '@mdi/js';

import { Note } from '../../interfaces';
import adminActions from '../../actions/admin';

import Modal from '../page/Modal';

interface NotesModalProps {
    close: () => void;
    note: Note;
}

class NotesModal extends React.PureComponent<NotesModalProps & DispatchProp> {
    title: RefObject<HTMLInputElement>;
    content: RefObject<HTMLTextAreaElement>;

    constructor(props: NotesModalProps & DispatchProp) {
        super(props);

        this.title = React.createRef();
        this.content = React.createRef();
    }

    save(): void {
        if (!this.title.current || !this.content.current || !this.title.current.value || !this.title.current.value.length) return;

        this.props.dispatch(adminActions.saveNote(this.props.note.id, this.title.current.value, this.content.current.value));
        this.props.close();
    }

    delete(): void {
        this.props.dispatch(adminActions.deleteNote(this.props.note.id));
        this.props.close();
    }

    render(): React.ReactElement {
        return (
            <Modal close={this.props.close} className="admin-overlay">
                <input
                    type="text"
                    maxLength={64}
                    placeholder="Title"
                    autoComplete="off"
                    required
                    ref={this.title}
                    defaultValue={this.props.note.title}
                />
                <textarea
                    className="monospace"
                    rows={20}
                    placeholder="Notes..."
                    autoComplete="off"
                    wrap="off"
                    ref={this.content}
                    defaultValue={this.props.note.content}
                />
                <div>
                    {this.props.note.id ? (
                        <button className="button-icon" onClick={this.delete.bind(this)}>
                            <Icon path={mdiDeleteOutline} size="28px" title="Delete" />
                        </button>
                    ) : null}
                    <button className="button-icon text-small" onClick={this.save.bind(this)}>
                        <Icon path={mdiContentSaveOutline} size="28px" title="Save" />
                    </button>
                    <button className="button-icon float-right text-small" onClick={this.props.close}>
                        <Icon path={mdiCloseCircleOutline} size="28px" title="Cancel" />
                    </button>
                </div>
            </Modal>
        );
    }
}

export default connect()(NotesModal);
