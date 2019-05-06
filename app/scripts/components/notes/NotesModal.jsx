import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import adminActions from '../../actions/admin.js';

import { PlusIcon } from '../page/Icons.jsx';
import Modal from '../page/Modal.jsx';

class NotesModal extends React.PureComponent {
    constructor(props) {
        super(props);

        this.title = React.createRef();
        this.content = React.createRef();
    }

    save() {
        if (!this.title.current.value || !this.title.current.value.length) return;

        this.props.dispatch(adminActions.saveNote(this.props.note.id, this.title.current.value, this.content.current.value));
        this.props.close();
    }

    delete() {
        this.props.dispatch(adminActions.deleteNote(this.props.note.id));
        this.props.close();
    }

    render() {
        return (
            <Modal close={this.props.close} className="admin-overlay">
                <input
                    type="text"
                    maxLength="64"
                    placeholder="Title"
                    autoComplete="off"
                    required
                    ref={this.title}
                    defaultValue={this.props.note.title}
                />
                <textarea
                    className="monospace"
                    rows="20"
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

NotesModal.propTypes = {
    note: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default connect()(NotesModal);
