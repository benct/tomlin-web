import React from 'react';

export default class Files extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileTree: []
        };
    }

    render() {
        return <div className="text">Files?</div>
    }
}