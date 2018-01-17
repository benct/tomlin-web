import React from 'react';
import PropTypes from 'prop-types';

import { fetchFile } from '../lib/api.js';

export default class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: null,
            loading: 'Loading text file...'
        };
    }

    componentWillMount() {
        this.loadContent(this.props.file);
    }

    loadContent(file) {
        fetchFile(`/assets/content/${file}.txt`)
            .then((data) => this.setState({ notes: data }))
            .catch(() => this.setState({ loading: 'Could not load text file...' }));
    }

    render() {
        return (
            <div className="wrapper">
                { this.state.notes ?
                    <pre>{ this.state.notes }</pre> :
                    <div className="link-message">{ this.state.loading }</div> }
            </div>
        );
    }
}

Notes.propTypes = {
    file: PropTypes.string.isRequired
};