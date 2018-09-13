import React from 'react';
import PropTypes from 'prop-types';

import { fetchFile } from '../lib/api.js';

export default class Links extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: null,
            loading: 'Loading link file...',
        };
    }

    componentWillMount() {
        this.loadContent(this.props.file);
    }

    loadContent(file) {
        fetchFile(`/assets/content/${file}.json`)
            .then(data => this.setState({ links: JSON.parse(data) }))
            .catch(() => this.setState({ loading: 'Could not load link file...' }));
    }

    renderLink(link, idx, icon) {
        return (
            <a className="link-anchor" key={idx} href={link.href} target="_blank" rel="noopener noreferrer">
                <img src={`https://www.google.com/s2/favicons?domain_url=${icon.enabled ? link.href : icon.default}`} alt="" />
                <span>{link.text}</span>
            </a>
        );
    }

    renderGroup(group, idx) {
        return (
            <div className="link-group" key={idx} style={{ flexOrder: idx }}>
                <h4 className="link-group-title">{group.title}</h4>
                {group.links.map((item, i) => this.renderLink(item, i, group.icon))}
            </div>
        );
    }

    render() {
        return (
            <div className="wrapper link-groups">
                {this.state.links ? (
                    this.state.links.map((item, i) => this.renderGroup(item, i))
                ) : (
                    <div className="link-message">{this.state.loading}</div>
                )}
            </div>
        );
    }
}

Links.propTypes = {
    file: PropTypes.string.isRequired,
};
