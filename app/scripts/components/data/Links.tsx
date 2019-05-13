import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { DefaultState, LinkState } from '../../interfaces';
import actions from '../../actions/base.js';

interface LinkProps {
    dispatch: Dispatch;
    file: string;
}

interface LinkGroup {
    title: string;
    links: Link[];
    icon: LinkIcon;
}

interface LinkIcon {
    enabled: boolean;
    default: string;
}

interface Link {
    href: string;
    text: string;
}

class Links extends React.PureComponent<LinkProps & LinkState> {
    componentDidMount(): void {
        this.props.dispatch(actions.loadContent({ field: 'links', file: this.props.file }));
    }

    static renderLink(link: Link, idx: number, icon: LinkIcon): React.ReactElement {
        return (
            <a className="link-anchor" key={idx} href={link.href} target="_blank" rel="noopener noreferrer">
                <img src={`https://www.google.com/s2/favicons?domain_url=${icon.enabled ? link.href : icon.default}`} alt="" />
                <span>{link.text}</span>
            </a>
        );
    }

    static renderGroup(group: LinkGroup, idx: number): React.ReactElement {
        return (
            <div className="link-group" key={idx} style={{ order: idx }}>
                <h4 className="link-group-title">{group.title}</h4>
                {group.links.map((item, idx): React.ReactElement => Links.renderLink(item, idx, group.icon))}
            </div>
        );
    }

    render(): React.ReactElement {
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

export default connect(
    (state: DefaultState): LinkState => ({
        content: state.links.content,
        loading: state.links.loading,
    })
)(Links);
