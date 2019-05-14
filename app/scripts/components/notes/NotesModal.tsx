import React, { RefObject } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import adminActions from '../../actions/admin.js';

import { Note } from '../../interfaces';
import { PlusIcon } from '../page/Icons';
import Modal from '../page/Modal';

interface NotesModalProps {
    dispatch: Dispatch;
    close: () => void;
    note: Note;
}

class NotesModal extends React.PureComponent<NotesModalProps> {
    title: RefObject<HTMLInputElement>;
    content: RefObject<HTMLTextAreaElement>;

    constructor(props: NotesModalProps) {
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
                        <button className="button-icon button-text-icon" onClick={this.delete.bind(this)}>
                            <img src={require(`../../../images/icon/remove.svg`)} alt="Delete" width={22} height={22} />
                            <span className="pls">Delete</span>
                        </button>
                    ) : null}
                    <button className="button-icon button-text-icon text-small" onClick={this.save.bind(this)}>
                        <img src={require(`../../../images/icon/save.svg`)} alt="Save" width={22} height={22} />
                        <span className="pls">Save</span>
                    </button>
                    <button className="button-icon button-text-icon float-right text-small" onClick={this.props.close}>
                        <PlusIcon width={24} height={24} rotate />
                        <span className="pls">Cancel</span>
                    </button>
                </div>
            </Modal>
        );
    }
}

export default connect()(NotesModal);
