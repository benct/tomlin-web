import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../../actions/base.js';

class Notes extends React.Component {
    componentDidMount() {
        this.props.dispatch(actions.loadContent({ type: 'notes', file: this.props.file }));
    }

    render() {
        return (
            <div className="wrapper">
                {this.props.content ? (
                    <pre>{this.props.content}</pre>
                ) : (
                    <div className="link-message">{this.props.loading ? 'Loading...' : 'No data...'}</div>
                )}
            </div>
        );
    }
}

Notes.propTypes = {
    dispatch: PropTypes.func.isRequired,
    file: PropTypes.string.isRequired,
    content: PropTypes.array,
    loading: PropTypes.bool.isRequired,
};

export default connect(state => ({
    content: state.notes.content,
    loading: state.notes.loading,
}))(Notes);
