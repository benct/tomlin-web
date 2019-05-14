import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import adminActions from '../../actions/admin.js';

import { DefaultState, Note } from '../../interfaces';
import { PlusIcon } from '../page/Icons';
import NotesModal from './NotesModal';

interface NotesProps {
    dispatch: Dispatch;
    notes?: Note[];
}

interface NotesState {
    showOverlay: boolean;
    selected: Note | null;
}

class Notes extends React.PureComponent<NotesProps, NotesState> {
    constructor(props: NotesProps) {
        super(props);

        this.state = {
            showOverlay: false,
            selected: null,
        };
    }

    componentDidMount(): void {
        if (!this.props.notes || !this.props.notes.length) {
            this.props.dispatch(adminActions.getNotes());
        }
    }

    edit(note?: Note): void {
        this.setState({ selected: note || {}, showOverlay: true });
    }

    closeModal(): void {
        this.setState({ selected: null, showOverlay: false });
    }

    render(): React.ReactElement {
        return (
            <>
                {this.props.notes && this.props.notes.length ? (
                    this.props.notes.map(
                        (note: Note): React.ReactElement => (
                            <div className="admin-logs mbm" key={`note${note.id}`}>
                                <code>
                                    {note.updated}
                                    <br />
                                    <button className="button-blank text-left strong" onClick={(): void => this.edit(note)}>
                                        {note.title || 'No title'}
                                    </button>
                                </code>
                                <pre>{note.content || 'No content...'}</pre>
                            </div>
                        )
                    )
                ) : (
                    <div className="link-message">No notes found...</div>
                )}
                <div className="text-right">
                    <button className="button-icon button-text-icon mvn" onClick={this.edit.bind(this, undefined)}>
                        <span>New</span>
                        <PlusIcon width={22} height={22} />
                    </button>
                </div>
                {this.state.showOverlay && this.state.selected ? (
                    <NotesModal note={this.state.selected} close={this.closeModal.bind(this)} />
                ) : null}
            </>
        );
    }
}

export default connect((state: DefaultState): object => ({ notes: state.admin.notes }))(Notes);
