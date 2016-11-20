import React from 'react';

import Filelist from '../components/filelist.jsx';
import { fetchContent, fetchFile } from '../api/api.js';

const PARENT_DIR = '..';

export default class Files extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cwd: '',
            content: [],
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

    refreshContent(cwd) {
        fetchContent({ action: 'ls', path: cwd })
            .then((data) => this.setState({ content: data }))
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
        this.setState({ cwd: dir });
        this.refreshContent(dir);
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

    forceDownload(item) {
        console.log(item);
        console.log('Not yet implemented.');
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
        switch (event.keyCode) {
            case 8:
                this.changeDirectory(PARENT_DIR);
                break;
            case 13:
            case 27:
                this.closePreview();
                break;
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
                <div style={{textAlign: 'right'}}>
                    <input className="file-control" type="button" onClick={() => this.changeDirectory(PARENT_DIR)} value="UP" />
                </div>
                <Filelist content={this.state.content} handleClick={this.handleClick.bind(this)} />
                <div className="file-overlay" style={{display: this.state.preview ? 'flex' : 'none'}}>
                    { this.renderPreview() }
                </div>
            </div>
        );
    }
}