import React from 'react';

import Filelist from '../components/filelist.jsx';
import fetchContent from '../api/api.js';

export default class Files extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cwd: '',
            content: [],
            status: 200
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.refreshContent(this.state.cwd);
    }

    refreshContent(cwd) {
        fetchContent({ action: 'ls', path: cwd })
            .then((data) => this.setState({ content: data.content, status: data.status }))
            .catch((error) => console.log('Request failed:', error));
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

    openFile(path) {

    }

    forceDownload(path) {

    }

    handleClick(content) {
        if (content.dir) {
            this.changeDirectory(content.name);
        } else if (content.preview) {
            this.openFile(content.href);
        } else {
            this.forceDownload(content.href);
        }
    }

    render() {
        return (
            <div>
                <div onClick={() => this.changeDirectory('..')}>UP</div>
                <Filelist content={this.state.content} handleClick={this.handleClick} />
            </div>
        );
    }
}