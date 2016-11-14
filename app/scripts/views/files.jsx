import React from 'react';

export default class Files extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cwd: '.',
            directories: [
                {
                    name: '..',
                    shortName: '..',
                    size: '4.00 KB',
                    perms: 'drwxr-xr-x',
                    date: '01/01/1970',
                    isDir: true,
                    type: 'dir',
                    href: '/',
                    download: false,
                    icon: 'dir.png',
                    preview: false
                },{
                    name: 'directory',
                    shortName: 'directory',
                    size: '4.00 KB',
                    perms: 'drwxr-xr-x',
                    date: '01/01/1970',
                    isDir: true,
                    type: 'dir',
                    href: '/files/directory',
                    download: false,
                    icon: 'dir.png',
                    preview: false
                }
            ],
            files: [
                {
                    name: 'test.jpg',
                    shortName: 'test.jpg',
                    size: '1.64 MB',
                    perms: '-rwxr--r--',
                    date: '23/05/1988',
                    isDir: false,
                    type: 'jpg',
                    href: '/files/test.jpg',
                    download: 'TODO: download function',
                    icon: 'jpg.png',
                    preview: true
                },{
                    name: 'test.png',
                    shortName: 'test.png',
                    size: '3.24 MB',
                    perms: '-rwxrwxrwx',
                    date: '23/05/1988',
                    isDir: false,
                    type: 'png',
                    href: '/files/test.png',
                    download: 'TODO: download function',
                    icon: 'png.png',
                    preview: true
                }
            ]
        };
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
    }

    canPreview(type) {
        return 'png|jpg|jpeg|gif|mp4|txt|html'.indexOf(type) >= 0;
    }

    openFile(path) {

    }

    forceDownload(path) {

    }

    handleClick(content) {
        if (content.isDir) {
            this.changeDirectory(content.name);
        } else if (this.canPreview(content.type)) {
            this.openFile(content.href);
        } else {
            this.forceDownload(content.href);
        }
    }

    renderItem(content) {
        return (
            <tr>
                <td><img className="fileicon" src={require('../../images/file/' + content.icon)}/></td>
                <td className="filename" onClick={() => this.handleClick(content)}>{content.shortName}</td>
                <td className="fileinfo monospace hide-lt480">{content.size}</td>
                <td className="fileinfo monospace hide-lt768">{content.perms}</td>
                <td className="fileinfo monospace hide-lt600">{content.date}</td>
            </tr>
        );
    }

    render() {
        const content = this.state.directories.map((item, i) => this.renderItem(item, i))
            .concat(this.state.files.map((item, i) => this.renderItem(item, i)));
        return (
            <table className="filesystem">
                <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th className="leftify">Filename</th>
                        <th className="hide-lt480">Size</th>
                        <th className="hide-lt768">Permissions</th>
                        <th className="hide-lt600">Created</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.directories.length || this.state.files.length ? content : (<tr><td>Empty</td></tr>)}
                </tbody>
            </table>
        );
    }
}