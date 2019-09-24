import React from 'react';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiFileDocumentBoxPlusOutline } from '@mdi/js';

import { DefaultState, Note, ThunkDispatchProp } from '../../interfaces';
import { getNotes } from '../../actions/admin';

import NotesModal from './NotesModal';

interface NotesProps {
    notes?: Note[];
}

interface NotesState {
    showOverlay: boolean;
    selected: Note | null;
}

class Notes extends React.PureComponent<NotesProps & ThunkDispatchProp, NotesState> {
    constructor(props: NotesProps & ThunkDispatchProp) {
        super(props);

        this.state = {
            showOverlay: false,
            selected: null,
        };
    }

    componentDidMount(): void {
        if (!this.props.notes || !this.props.notes.length) {
            this.props.dispatch(getNotes());
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
                    <div className="text">No notes found...</div>
                )}
                <div className="text-right">
                    <button className="button-icon" onClick={this.edit.bind(this, undefined)}>
                        <Icon path={mdiFileDocumentBoxPlusOutline} size="28px" title="New" />
                    </button>
                </div>
                {this.state.showOverlay && this.state.selected ? (
                    <NotesModal note={this.state.selected} close={this.closeModal.bind(this)} />
                ) : null}
            </>
        );
    }
}

export default connect((state: DefaultState): NotesProps => ({ notes: state.admin.notes }))(Notes);
