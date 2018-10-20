/* global File, FormData */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../../redux/actions.js';

import { CloseIcon, NewDirIcon, ParentDirIcon, RefreshIcon, UploadIcon } from '../page/icons.jsx';
import FileList from './filelist.jsx';

const PARENT_DIR = '..';

class Files extends React.Component {
    constructor(props) {
        super(props);

        this.handleKeyboard = this.handleKeyboard.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(actions.refreshFiles());

        document.addEventListener('keyup', this.handleKeyboard, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.handleKeyboard, false);
    }

    handleClick(item) {
        if (item.dir) {
            this.props.dispatch(actions.changeDirectory(item.name));
        } else if (item.preview) {
            this.previewFile(item);
        } else {
            this.forceDownload(item);
        }
    }

    handleKeyboard(event) {
        event.preventDefault();

        switch (event.keyCode) {
            case 8: // backspace
                this.props.dispatch(actions.changeDirectory(PARENT_DIR));
                break;
            case 13: // enter
                if (this.props.focused !== null) {
                    this.handleClick(this.props.content[this.props.focused]);
                }
                break;
            case 27: // escape
                this.closePreview();
                break;
            case 38: // up
                if (this.props.focused === null) {
                    this.props.dispatch(actions.setFileFocus(0));
                } else if (this.props.focused > 0) {
                    this.props.dispatch(actions.setFileFocus(this.props.focused - 1));
                }
                break;
            case 40: // down
                if (this.props.focused === null) {
                    this.props.dispatch(actions.setFileFocus(0));
                } else if (this.props.focused < this.props.content.length - 1) {
                    this.props.dispatch(actions.setFileFocus(this.props.focused + 1));
                }
                break;
        }
    }

    handleUpload() {
        const files = this.fileInput.files;
        if (!files.length) {
            return;
        }

        const formData = new FormData();
        for (let key in files) {
            if (files.hasOwnProperty(key) && files[key] instanceof File) {
                formData.append(key, files[key]);
            }
        }

        this.props.dispatch(actions.uploadFile(formData));

        this.fileInput.value = null;
        this.fileLabel.innerHTML = 'Choose a file';
    }

    handleFileChange(event) {
        if (this.fileInput && this.fileInput.files.length > 1) {
            this.fileLabel.innerHTML = `${this.fileInput.files.length} files selected`;
        } else if (event.target.value) {
            this.fileLabel.innerHTML = event.target.value.split('\\').pop();
        } else {
            this.fileLabel.innerHTML = 'Choose a file';
        }
    }

    forceDownload(item) {
        setTimeout(() => window.open(item.href), 100);
    }

    previewFile(item) {
        if ('jpg|jpeg|png|bmp|gif|svg|ico|pdf'.indexOf(item.type) >= 0) {
            this.props.dispatch(actions.setFilePreview({ src: item.href, image: true }));
        } else {
            this.props.dispatch(actions.showFile(item.href));
        }
    }

    closePreview() {
        this.props.dispatch(actions.setFilePreview(null));
    }

    render() {
        return (
            <div className="wrapper text-center">
                <div className="file-table-header">
                    <button
                        className="button-icon"
                        onClick={() => this.props.dispatch(actions.changeDirectory(PARENT_DIR))}
                        disabled={this.props.cwd === ''}>
                        <ParentDirIcon />
                    </button>
                    <div className="text-right">
                        <button className="button-icon" onClick={() => this.props.dispatch(actions.createDirectory())}>
                            <NewDirIcon />
                        </button>
                        <button className="button-icon" onClick={() => this.props.dispatch(actions.refreshFiles())}>
                            <RefreshIcon />
                        </button>
                    </div>
                </div>
                <FileList
                    content={this.props.content}
                    focused={this.props.focused}
                    handleClick={this.handleClick.bind(this)}
                    handleRename={item => this.props.dispatch(actions.renameFile(item))}
                    handleDelete={item => this.props.dispatch(actions.deleteFile(item))}
                />
                <div>
                    <label htmlFor="file" className="color-primary pointer">
                        <input
                            type="file"
                            name="files[]"
                            id="file"
                            onChange={this.handleFileChange.bind(this)}
                            ref={input => (this.fileInput = input)}
                            multiple
                        />
                        <UploadIcon />
                        <span className="mlm" ref={label => (this.fileLabel = label)}>
                            Choose a file
                        </span>
                    </label>
                    <br />
                    <button className="button-default text-small mtl" onClick={this.handleUpload.bind(this)}>
                        Upload
                    </button>
                </div>

                {this.props.preview ? (
                    <div className="overlay">
                        <CloseIcon className="file-close" onClick={this.closePreview.bind(this)} />
                        {this.props.preview.image ? (
                            <img src={this.props.preview.src} alt="Preview" />
                        ) : (
                            <pre className="overlay-preview">{this.props.preview.content}</pre>
                        )}
                    </div>
                ) : null}
            </div>
        );
    }
}

Files.propTypes = {
    dispatch: PropTypes.func.isRequired,
    cwd: PropTypes.string.isRequired,
    content: PropTypes.array.isRequired,
    focused: PropTypes.number,
    preview: PropTypes.object,
};

export default connect(state => ({
    cwd: state.files.cwd,
    content: state.files.content,
    focused: state.files.focused,
    preview: state.files.preview,
}))(Files);
