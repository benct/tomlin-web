/* global prompt, confirm, File, FormData */
import React from 'react';
import { Link } from 'react-router-dom';

import { post, fetchFile } from '../../util/api.js';
import { BackIcon, CloseIcon, NewDirIcon, ParentDirIcon, RefreshIcon, UploadIcon } from '../page/icons.jsx';
import FileList from './filelist.jsx';

const PARENT_DIR = '..';

export default class Files extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cwd: '',
            content: [],
            focused: null,
            preview: null,
        };
    }

    componentDidMount() {
        this.refreshContent(this.state.cwd);

        document.addEventListener('keyup', this.handleKeyboard.bind(this), false);
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.handleKeyboard.bind(this), false);
    }

    refreshContent(cwd) {
        post({ action: 'ls', path: cwd }).then(data => this.setState({ content: data.content }));
    }

    changeDirectory(dirname) {
        let dir = this.state.cwd;
        if (dirname === PARENT_DIR) {
            if (dir === '') return;
            dir = dir.substring(0, dir.lastIndexOf('/'));
        } else {
            dir += (dir === '' ? '' : '/') + dirname;
        }
        this.setState({
            cwd: dir,
            focused: null,
        });
        this.refreshContent(dir);
    }

    handleSuccess(data) {
        if (data.content === true) {
            this.refreshContent(this.state.cwd);
            this.fileLabel.innerHTML = 'Choose a file';
        }
    }

    handleCreateDirectory() {
        const name = prompt('Enter name of new folder:');
        if (name) {
            post({ action: 'mkdir', path: `${this.state.cwd}/${name}` }).then(this.handleSuccess.bind(this));
        }
    }

    handleRename(item) {
        const name = prompt('Enter new name of file:', item.name);
        if (name) {
            post({ action: 'mv', path: `${this.state.cwd}/${item.name}`, name: name }).then(this.handleSuccess.bind(this));
        }
    }

    handleDelete(item) {
        if (confirm(`Are you sure you want to delete ${item.name}?`)) {
            const action = item.dir ? 'rmdir' : 'rm';
            post({ action: action, path: `${this.state.cwd}/${item.name}` }).then(this.handleSuccess.bind(this));
        }
    }

    handleClick(item) {
        if (item.dir) {
            this.changeDirectory(item.name);
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
                this.changeDirectory(PARENT_DIR);
                break;
            case 13: // enter
                if (this.state.focused !== null) {
                    this.handleClick(this.state.content[this.state.focused]);
                }
                break;
            case 27: // escape
                this.closePreview();
                break;
            case 38: // up
                if (this.state.focused === null) {
                    this.setState({ focused: 0 });
                } else if (this.state.focused > 0) {
                    this.setState({ focused: this.state.focused - 1 });
                }
                break;
            case 40: // down
                if (this.state.focused === null) {
                    this.setState({ focused: 0 });
                } else if (this.state.focused < this.state.content.length - 1) {
                    this.setState({ focused: this.state.focused + 1 });
                }
                break;
        }
    }

    handleUpload() {
        const formData = new FormData();
        const files = this.fileInput.files;
        for (let key in files) {
            if (files.hasOwnProperty(key) && files[key] instanceof File) {
                formData.append(key, files[key]);
            }
        }
        this.fileInput.value = null;

        post({ action: 'up', path: this.state.cwd }, formData).then(this.handleSuccess.bind(this));
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
        setTimeout(() => {
            window.open(item.href);
        }, 100);
    }

    previewFile(item) {
        if ('jpg|jpeg|png|bmp|gif|svg|ico|pdf'.indexOf(item.type) >= 0) {
            this.setState({ preview: { src: item.href, image: true } });
        } else {
            fetchFile(item.href).then(data => this.setState({ preview: { content: data, image: false } }));
        }
    }

    closePreview() {
        this.setState({ preview: null });
    }

    render() {
        return (
            <div className="wrapper centerify">
                <div className="file-table-header">
                    <button className="file-control">
                        <Link to="/">
                            <BackIcon />
                        </Link>
                    </button>
                    <div className="rightify">
                        <button className="file-control" onClick={this.handleCreateDirectory.bind(this)}>
                            <NewDirIcon />
                        </button>
                        <button className="file-control" onClick={() => this.refreshContent(this.state.cwd)}>
                            <RefreshIcon />
                        </button>
                        <button className="file-control" onClick={() => this.changeDirectory(PARENT_DIR)} disabled={this.state.cwd === ''}>
                            <ParentDirIcon />
                        </button>
                    </div>
                </div>
                <FileList
                    content={this.state.content}
                    focused={this.state.focused}
                    handleClick={this.handleClick.bind(this)}
                    handleRename={this.handleRename.bind(this)}
                    handleDelete={this.handleDelete.bind(this)}
                />
                <div>
                    <label htmlFor="file">
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
                    <button className="file-button mtl" onClick={this.handleUpload.bind(this)}>
                        Upload
                    </button>
                </div>

                {this.state.preview ? (
                    <div className="overlay">
                        <CloseIcon className="file-close" onClick={this.closePreview.bind(this)} />
                        {this.state.preview.image ? (
                            <img src={this.state.preview.src} alt="Preview" />
                        ) : (
                            <pre className="overlay-preview">{this.state.preview.content}</pre>
                        )}
                    </div>
                ) : null}
            </div>
        );
    }
}
