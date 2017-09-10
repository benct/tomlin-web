import React from 'react';

import FileList from '../components/filelist.jsx';
import { fetchContent, fetchFile } from '../lib/api.js';

const PARENT_DIR = '..';

export default class Files extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cwd: '',
            content: [],
            focused: null,
            preview: null,
            previewContents: null
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
            fetchContent({ action: 'mkdir', path: `${this.state.cwd}/${name}`})
                .then(this.handleSuccess.bind(this))
                .catch(console.log);
        }
    }

    handleDelete(item) {
        const action = item.dir ? 'rmdir' : 'rm';
        fetchContent({ action: action, path: `${this.state.cwd}/${item.name}`})
            .then(this.handleSuccess.bind(this))
            .catch(console.log);
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
                .then((data) => this.setState({ previewContents: data }));
            this.setState({ preview: true });
        }
    }

    closePreview() {
        this.setState({ preview: null, previewContents: null });
    }

    renderPreview() {
        if (this.state.preview) {
            if (this.state.preview.image) {
                return <img src={this.state.preview.src} onClick={this.closePreview.bind(this)} alt="Preview" />
            } else {
                return <pre onClick={this.closePreview.bind(this)}>{this.state.previewContents}</pre>
            }
        }
    }

    render() {
        return (
            <div>
                <div>
                    <div className="file-table-header">
                        <span className="mll mts">{this.state.cwd}</span>
                        <div className="rightify">
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
                          handleDelete={this.handleDelete.bind(this)}/>
                <div className="file-overlay" style={{display: this.state.preview ? 'flex' : 'none'}}>
                    { this.renderPreview() }
                </div>
            </div>
        );
    }
}