import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import adminActions from '../../actions/admin.js';

import { PlusIcon } from '../page/Icons.jsx';
import NotesModal from './NotesModal.jsx';

class Notes extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            showOverlay: false,
            selected: null,
        };
    }

    componentDidMount() {
        if (!this.props.notes.length) {
            this.props.dispatch(adminActions.getNotes());
        }
    }

    edit(note) {
        this.setState({ selected: note || {}, showOverlay: true });
    }

    closeModal() {
        this.setState({ selected: null, showOverlay: false });
    }

    render() {
        return (
            <>
                {this.props.notes.length ? (
                    this.props.notes.map(note => (
                        <div className="admin-logs mbm" key={`note${note.id}`}>
                            <code>
                                {note.updated}
                                <br />
                                <button className="button-blank text-left strong" onClick={() => this.edit(note)}>
                                    {note.title || 'No title'}
                                </button>
                            </code>
                            <pre>{note.content || 'No content...'}</pre>
                        </div>
                    ))
                ) : (
                    <div className="link-message">No notes found...</div>
                )}
                <div className="text-right">
                    <button className="button-icon button-text-icon mvn" onClick={this.edit.bind(this, null)}>
                        <span>New</span>
                        <PlusIcon width={22} height={22} />
                    </button>
                </div>
                {this.state.showOverlay ? <NotesModal note={this.state.selected} close={this.closeModal.bind(this)} /> : null}
            </>
        );
    }
}

Notes.propTypes = {
    dispatch: PropTypes.func.isRequired,
    notes: PropTypes.array.isRequired,
};

export default connect(state => ({ notes: state.admin.notes }))(Notes);
