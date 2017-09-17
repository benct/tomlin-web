import React from 'react';

import FileList from '../components/filelist.jsx';
import { post, fetchFile } from '../lib/api.js';

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
        post({ action: 'ls', path: cwd })
            .then((data) => this.setState({ content: data.content }));
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
            post({ action: 'mkdir', path: `${this.state.cwd}/${name}` })
                .then(this.handleSuccess.bind(this));
        }
    }

    handleRename(item) {
        const name = prompt('Enter new name of file:', item.name);
        if (name) {
            post({ action: 'mv', path: `${this.state.cwd}/${item.name}`, name: name })
                .then(this.handleSuccess.bind(this));
        }
    }

    handleDelete(item) {
        if (confirm(`Are you sure you want to delete ${item.name}?`)) {
            const action = item.dir ? 'rmdir' : 'rm';
            post({ action: action, path: `${this.state.cwd}/${item.name}` })
                .then(this.handleSuccess.bind(this));
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

        post({ action: 'up', path: this.state.cwd }, formData)
            .then(this.handleSuccess.bind(this));

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
                <div className="file-table-header">
                    <button className="file-control" onClick={this.toggleUpload.bind(this)}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 486.3 486.3" width="28" height="28">
                            <path d="M395.5,135.8c-5.2-30.9-20.5-59.1-43.9-80.5c-26-23.8-59.8-36.9-95-36.9c-27.2,0-53.7,7.8-76.4,22.5
                                c-18.9,12.2-34.6,28.7-45.7,48.1c-4.8-0.9-9.8-1.4-14.8-1.4c-42.5,0-77.1,34.6-77.1,77.1c0,5.5,0.6,10.8,1.6,16
                                C16.7,200.7,0,232.9,0,267.2c0,27.7,10.3,54.6,29.1,75.9c19.3,21.8,44.8,34.7,72,36.2c0.3,0,0.5,0,0.8,0h86
                                c7.5,0,13.5-6,13.5-13.5s-6-13.5-13.5-13.5h-85.6C61.4,349.8,27,310.9,27,267.1c0-28.3,15.2-54.7,39.7-69
                                c5.7-3.3,8.1-10.2,5.9-16.4c-2-5.4-3-11.1-3-17.2c0-27.6,22.5-50.1,50.1-50.1c5.9,0,11.7,1,17.1,3c6.6,2.4,13.9-0.6,16.9-6.9
                                c18.7-39.7,59.1-65.3,103-65.3c59,0,107.7,44.2,113.3,102.8c0.6,6.1,5.2,11,11.2,12c44.5,7.6,78.1,48.7,78.1,95.6
                                c0,49.7-39.1,92.9-87.3,96.6h-73.7c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5h74.2c0.3,0,0.6,0,1,0c30.5-2.2,59-16.2,80.2-39.6
                                c21.1-23.2,32.6-53,32.6-84C486.2,199.5,447.9,149.6,395.5,135.8z" fill="#FFFFFF"/>
                            <path d="M324.2,280c5.3-5.3,5.3-13.8,0-19.1l-71.5-71.5c-2.5-2.5-6-4-9.5-4s-7,1.4-9.5,4l-71.5,71.5c-5.3,5.3-5.3,13.8,0,19.1
                                c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l48.5-48.5v222.9c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5V231.5l48.5,48.5
                                C310.4,285.3,318.9,285.3,324.2,280z" fill="#FFFFFF"/>
                        </svg>
                    </button>
                    <div className="rightify">
                        <button className="file-control" onClick={this.handleCreateDirectory.bind(this)}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 476.737 476.737" width="28" height="28">
                                <path d="M444.955,31.782H333.208c-17.576,0-37.758,8.931-47.165,31.782c0,0-4.132,29.145-31.782,31.782
                                H31.782C14.239,95.347,0,109.077,0,126.621v286.551c0,17.544,14.239,31.783,31.782,31.783h413.172
                                c17.544,0,31.782-14.239,31.782-31.783V63.565C476.737,46.021,462.499,31.782,444.955,31.782z M444.955,126.621v286.551H31.782
                                V127.13H254.26l3.051-0.159c29.812-2.829,48.246-23.71,56.732-45.163c8.263-20.722,22.661-18.243,22.661-18.243h108.251V126.621 z"
                                      fill="#FFFFFF"/>
                                <path d="M317.825,254.26H254.26v-63.565c0-8.772-7.151-15.891-15.891-15.891
                                c-8.772,0-15.891,7.119-15.891,15.891v63.565h-63.565c-8.772,0-15.891,7.151-15.891,15.891s7.119,15.891,15.891,15.891h63.565
                                v63.565c0,8.74,7.119,15.891,15.891,15.891c8.74,0,15.891-7.151,15.891-15.891v-63.565h63.565
                                c8.74,0,15.891-7.151,15.891-15.891S326.565,254.26,317.825,254.26z" fill="#FFFFFF"/>
                            </svg>
                        </button>
                        <button className="file-control" onClick={() => this.refreshContent(this.state.cwd)}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 489.711 489.711" width="28" height="28">
                                <path d="M112.156,97.111c72.3-65.4,180.5-66.4,253.8-6.7l-58.1,2.2c-7.5,0.3-13.3,6.5-13,14c0.3,7.3,6.3,13,13.5,13
                                c0.2,0,0.3,0,0.5,0l89.2-3.3c7.3-0.3,13-6.2,13-13.5v-1c0-0.2,0-0.3,0-0.5v-0.1l0,0l-3.3-88.2c-0.3-7.5-6.6-13.3-14-13
                                c-7.5,0.3-13.3,6.5-13,14l2.1,55.3c-36.3-29.7-81-46.9-128.8-49.3c-59.2-3-116.1,17.3-160,57.1c-60.4,54.7-86,137.9-66.8,217.1
                                c1.5,6.2,7,10.3,13.1,10.3c1.1,0,2.1-0.1,3.2-0.4c7.2-1.8,11.7-9.1,9.9-16.3C36.656,218.211,59.056,145.111,112.156,97.111z"
                                      fill="#FFFFFF"/>
                                <path d="M462.456,195.511c-1.8-7.2-9.1-11.7-16.3-9.9c-7.2,1.8-11.7,9.1-9.9,16.3c16.9,69.6-5.6,142.7-58.7,190.7
                                c-37.3,33.7-84.1,50.3-130.7,50.3c-44.5,0-88.9-15.1-124.7-44.9l58.8-5.3c7.4-0.7,12.9-7.2,12.2-14.7s-7.2-12.9-14.7-12.2l-88.9,8
                                c-7.4,0.7-12.9,7.2-12.2,14.7l8,88.9c0.6,7,6.5,12.3,13.4,12.3c0.4,0,0.8,0,1.2-0.1c7.4-0.7,12.9-7.2,12.2-14.7l-4.8-54.1
                                c36.3,29.4,80.8,46.5,128.3,48.9c3.8,0.2,7.6,0.3,11.3,0.3c55.1,0,107.5-20.2,148.7-57.4
                                C456.056,357.911,481.656,274.811,462.456,195.511z" fill="#FFFFFF"/>
                            </svg>
                        </button>
                        <button className="file-control" onClick={() => this.changeDirectory(PARENT_DIR)} disabled={this.state.cwd === ''}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 129 129" width="28" height="28">
                                <path d="m121.4,61.6l-54-54c-0.7-0.7-1.8-1.2-2.9-1.2s-2.2,0.5-2.9,1.2l-54,54c-1.6,1.6-1.6,4.2 0,5.8 0.8,0.8
                                1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2l47-47v98.1c0,2.3 1.8,4.1 4.1,4.1s4.1-1.8 4.1-4.1v-98.1l47,47c1.6,1.6 4.2,1.6 5.8,0s1.5-4.2
                                1.42109e-14-5.8z" fill="#FFFFFF"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <FileList content={this.state.content} focused={this.state.focused}
                          handleClick={this.handleClick.bind(this)}
                          handleRename={this.handleRename.bind(this)}
                          handleDelete={this.handleDelete.bind(this)}/>
                { this.state.preview ?
                    (<div className="overlay">
                        { this.state.preview.image ?
                            <img src={this.state.preview.src} onClick={this.closePreview.bind(this)} alt="Preview" /> :
                            <pre onClick={this.closePreview.bind(this)}>{this.state.preview.content}</pre> }
                    </div>) : null }
                { this.state.upload ?
                    (<div className="overlay">
                        <div className="overlay-inner file-upload">
                            <button className="file-control file-cancel" onClick={this.toggleUpload.bind(this)}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" width="28" height="28">
                                    <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26
                                    S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z" fill="#FFFFFF"/>
                                    <path d="M35.707,16.293c-0.391-0.391-1.023-0.391-1.414,0L26,24.586l-8.293-8.293c-0.391-0.391-1.023-0.391-1.414,0
                                    s-0.391,1.023,0,1.414L24.586,26l-8.293,8.293c-0.391,0.391-0.391,1.023,0,1.414C16.488,35.902,16.744,36,17,36
                                    s0.512-0.098,0.707-0.293L26,27.414l8.293,8.293C34.488,35.902,34.744,36,35,36s0.512-0.098,0.707-0.293
                                    c0.391-0.391,0.391-1.023,0-1.414L27.414,26l8.293-8.293C36.098,17.316,36.098,16.684,35.707,16.293z" fill="#FFFFFF"/>
                                </svg>
                            </button>
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
                            <button className="file-button" onClick={this.handleUpload.bind(this)}>Upload</button>
                        </div>
                    </div>) : null }
            </div>
        );
    }
}