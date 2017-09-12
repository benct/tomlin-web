import React from 'react';

import FileList from '../components/filelist.jsx';
import { fetchContent, postContent, fetchFile } from '../lib/api.js';

const PARENT_DIR = '..';

export default class Files extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cwd: '',
            content: [],
            focused: null,
            preview: null,
            upload: false
        };
    }

    componentWillMount() {
        this.refreshContent(this.state.cwd);
    }

    componentDidMount() {
        document.addEventListener("keyup", this.handleKeyboard.bind(this), false);
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.handleKeyboard.bind(this), false);
    }

    refreshContent(cwd) {
        fetchContent({ action: 'ls', path: cwd })
            .then((data) => this.setState({ content: data.content }))
            .catch(console.log);
    }

    changeDirectory(dirname) {
        let dir = this.state.cwd;
        if (dirname === PARENT_DIR) {
            if (dir === '')
                return;
            dir = dir.substring(0, dir.lastIndexOf('/'));
        } else {
            dir += (dir === '' ? '' : '/') + dirname;
        }
        this.setState({
            cwd: dir,
            focused: null
        });
        this.refreshContent(dir);
    }

    handleSuccess(data) {
        if (data.content === true) {
            this.refreshContent(this.state.cwd);
        }
    }

    handleCreateDirectory() {
        const name = prompt('Enter name of new folder:');
        if (name) {
            fetchContent({ action: 'mkdir', path: `${this.state.cwd}/${name}` })
                .then(this.handleSuccess.bind(this))
                .catch(console.log);
        }
    }

    handleRename(item) {
        const name = prompt('Enter new name of file:', item.name);
        if (name) {
            fetchContent({ action: 'mv', path: `${this.state.cwd}/${item.name}`, name: name })
                .then(this.handleSuccess.bind(this))
                .catch(console.log);
        }
    }

    handleDelete(item) {
        if (confirm(`Are you sure you want to delete ${item.name}?`)) {
            const action = item.dir ? 'rmdir' : 'rm';
            fetchContent({ action: action, path: `${this.state.cwd}/${item.name}` })
                .then(this.handleSuccess.bind(this))
                .catch(console.log);
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
                    this.setState({ focused: --this.state.focused });
                }
                break;
            case 40: // down
                if (this.state.focused === null) {
                    this.setState({ focused: 0 });
                } else if (this.state.focused < (this.state.content.length - 1)) {
                    this.setState({ focused: ++this.state.focused });
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

        postContent({ action: 'up', path: this.state.cwd }, formData)
            .then(this.handleSuccess.bind(this))
            .catch(console.log);

        this.toggleUpload();
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

    toggleUpload() {
        this.setState({ upload: !this.state.upload });
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
            fetchFile(item.href)
                .then((data) => this.setState({ preview: { content: data, image: false } }));
        }
    }

    closePreview() {
        this.setState({ preview: null });
    }

    render() {
        return (
            <div>
                <div>
                    <div className="file-table-header">
                        <span className="mll mts">{this.state.cwd}</span>
                        <div className="rightify">
                            <input className="file-control" type="button" value="UL"
                                   onClick={this.toggleUpload.bind(this)}/>
                            <input className="file-control" type="button" value="New"
                                   onClick={this.handleCreateDirectory.bind(this)}/>
                            <input className="file-control" type="button" value="RF"
                                   onClick={() => this.refreshContent(this.state.cwd)}/>
                            <input className="file-control" type="button" value="UP"
                                   onClick={() => this.changeDirectory(PARENT_DIR)}
                                   disabled={this.state.cwd === ''}/>
                        </div>
                    </div>
                </div>
                <FileList content={this.state.content} focused={this.state.focused}
                          handleClick={this.handleClick.bind(this)}
                          handleRename={this.handleRename.bind(this)}
                          handleDelete={this.handleDelete.bind(this)}/>
                { this.state.preview ?
                    (<div className="file-overlay">
                        { this.state.preview.image ?
                            <img src={this.state.preview.src} onClick={this.closePreview.bind(this)} alt="Preview" /> :
                            <pre onClick={this.closePreview.bind(this)}>{this.state.preview.content}</pre> }
                    </div>) : null }
                { this.state.upload ?
                    (<div className="file-overlay">
                        <div className="file-upload">
                            <input type="file" name="files[]" id="file" onChange={this.handleFileChange.bind(this)}
                                   ref={(input) => (this.fileInput = input)} multiple/>
                            <label htmlFor="file">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                                    <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1
                                    0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7
                                    1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/>
                                </svg>
                                <span className="mlm" ref={(label) => (this.fileLabel = label)}>Choose a file</span>
                            </label>
                            <input type="submit" name="upload" value="Upload" className="mtn mbm"
                                   onClick={this.handleUpload.bind(this)}/>
                            <span className="file-cancel" onClick={this.toggleUpload.bind(this)}>Cancel</span>
                        </div>
                    </div>) : null }
            </div>
        );
    }
}