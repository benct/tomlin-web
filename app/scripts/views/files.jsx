import React from 'react';

import Filelist from '../components/filelist.jsx';
import fetchContent from '../api/api.js';

export default class Files extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cwd: '',
            content: [],
            preview: null
        };
    }

    componentWillMount() {
        this.refreshContent(this.state.cwd);
    }

    refreshContent(cwd) {
        fetchContent({ action: 'ls', path: cwd })
            .then((data) => this.setState({ content: data }))
            .catch(console.log);
    }

    changeDirectory(dirname) {
        let dir = this.state.cwd;
        if (dirname === '..') {
            if (dir === '')
                return;
            dir = dir.substring(0, dir.lastIndexOf('/'));
        } else {
            dir += (dir === '' ? '' : '/') + dirname;
        }
        this.setState({ cwd: dir });
        this.refreshContent(dir);
    }

    previewFile(path) {
        this.setState({ preview: path });
    }

    forceDownload(path) {
        console.log('Not yet implemented.');
    }

    handleClick(item) {
        console.log(item);
        if (item.dir) {
            this.changeDirectory(item.name);
        } else if (item.preview) {
            this.previewFile(item.href);
        } else {
            this.forceDownload(item.href);
        }
    }

    render() {
        return (
            <div>
                <div style={{textAlign: 'right'}}>
                    <input className="file-control" type="button" onClick={() => this.changeDirectory('..')} value="UP" />
                </div>
                <Filelist content={this.state.content} handleClick={this.handleClick.bind(this)} />
                <div className="file-overlay" style={{display: this.state.preview ? 'flex' : 'none'}}>
                    <img src={this.state.preview} onClick={() => this.setState({ preview: null })} />
                </div>
            </div>
        );
    }
}