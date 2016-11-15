import React from 'react';

import fetch from '../api/api.js'

export default class Files extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cwd: '.',
            content: [],
        };
    }

    componentDidMount() {
        this.refreshContent();
    }

    refreshContent() {
        fetch({ action: 'ls', path: this.state.cwd })
            .then((data) => this.setState({ content: data.content }))
            .catch((error) => console.log('Request failed:', error));
    }

    changeDirectory(dirname) {
        let dir = this.state.cwd;
        if (dirname === '..') {
            if (dir !== '.') {
                dir = dir.substring(0, dir.lastIndexOf('/'));
            }
        } else {
            dir += '/' + dirname;
        }
        this.setState({ cwd: dir });
        this.refreshContent();
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

    renderItem(content) {
        return (
            <tr>
                <td><img className="fileicon" src={require('../../images/file/' + content.icon)}/></td>
                <td className="filename"><span onClick={() => this.handleClick(content)}>{content.short}</span></td>
                <td className="fileinfo monospace hide-lt480 rightify"><span>{content.size}</span></td>
                <td className="fileinfo monospace hide-lt768"><span>{content.perms}</span></td>
                <td className="fileinfo monospace hide-lt600"><span>{content.date}</span></td>
            </tr>
        );
    }

    render() {
        return (
            <table className="filesystem">
                <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th className="leftify">Filename</th>
                        <th className="hide-lt480">Size</th>
                        <th className="hide-lt768">Permissions</th>
                        <th className="hide-lt600">Uploaded</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.content.length ?
                        this.state.content.map((item, i) => this.renderItem(item, i)) : (<tr><td>Empty</td></tr>)}
                </tbody>
            </table>
        );
    }
}