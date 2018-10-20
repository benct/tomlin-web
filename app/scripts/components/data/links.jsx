import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../../redux/actions.js';

class Links extends React.Component {
    componentDidMount() {
        this.props.dispatch(actions.loadContent({ type: 'links', file: this.props.file }));
    }

    static renderLink(link, idx, icon) {
        return (
            <a className="link-anchor" key={idx} href={link.href} target="_blank" rel="noopener noreferrer">
                <img src={`https://www.google.com/s2/favicons?domain_url=${icon.enabled ? link.href : icon.default}`} alt="" />
                <span>{link.text}</span>
            </a>
        );
    }

    static renderGroup(group, idx) {
        return (
            <div className="link-group" key={idx} style={{ flexOrder: idx }}>
                <h4 className="link-group-title">{group.title}</h4>
                {group.links.map((item, idx) => Links.renderLink(item, idx, group.icon))}
            </div>
        );
    }

    render() {
        return (
            <div className="wrapper link-groups">
                {this.props.content ? (
                    JSON.parse(this.props.content).map(Links.renderGroup)
                ) : (
                    <div className="link-message">{this.props.loading ? 'Loading...' : 'No data...'}</div>
                )}
            </div>
        );
    }
}

Links.propTypes = {
    dispatch: PropTypes.func.isRequired,
    file: PropTypes.string.isRequired,
    content: PropTypes.string,
    loading: PropTypes.bool.isRequired,
};

export default connect(state => ({
    content: state.links.content,
    loading: state.links.loading,
}))(Links);
