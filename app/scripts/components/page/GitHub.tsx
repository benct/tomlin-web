import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import Icon from '@mdi/react';
import {
    mdiAlertCircleOutline,
    mdiConsole,
    mdiHelpRhombusOutline,
    mdiLanguageHtml5,
    mdiLanguageJava,
    mdiLanguageJavascript,
    mdiLanguagePhp,
    mdiLanguageTypescript,
    mdiLoading,
    mdiSourceFork,
    mdiStarOutline,
} from '@mdi/js';

import { DefaultState, GitHubRepo, GitHubState } from '../../interfaces';

import githubActions from '../../actions/github';

type GitHubProps = GitHubState & Pick<DefaultState, 'loading'>;

class GitHub extends React.PureComponent<GitHubProps & DispatchProp> {
    componentDidMount(): void {
        if (!this.props.user) {
            this.props.dispatch(githubActions.getGitHubData());
        }
    }

    static getLanguageIcon(language: string): string {
        switch (language) {
            case 'JavaScript':
                return mdiLanguageJavascript;
            case 'TypeScript':
                return mdiLanguageTypescript;
            case 'Java':
            case 'Kotlin':
                return mdiLanguageJava;
            case 'PHP':
                return mdiLanguagePhp;
            case 'HTML':
                return mdiLanguageHtml5;
            case 'Shell':
                return mdiConsole;
            default:
                return mdiHelpRhombusOutline;
        }
    }

    static renderRepo(repo: GitHubRepo): React.ReactElement {
        return (
            <div className="github-repo mbm" key={repo.name}>
                <a href={repo.url} target="_blank" rel="noopener noreferrer" className="color-base truncate">
                    <Icon path={GitHub.getLanguageIcon(repo.language)} size="22px" title={repo.language} className="text-icon" />
                    <span className="valign-middle text-small">{repo.name}</span>
                </a>
                <div className="github-repo-state no-wrap">
                    <a href={`${repo.url}/stargazers`} target="_blank" rel="noopener noreferrer">
                        <Icon path={mdiStarOutline} size="22px" title="Stargazers" />
                        <span>{repo.stars}</span>
                    </a>
                    {repo.issues !== null && (
                        <a href={`${repo.url}/issues`} target="_blank" rel="noopener noreferrer">
                            <Icon path={mdiAlertCircleOutline} size="22px" title="Open Issues" />
                            <span>{repo.issues}</span>
                        </a>
                    )}
                    <a href={`${repo.url}/network/members`} target="_blank" rel="noopener noreferrer">
                        <Icon path={mdiSourceFork} size="22px" title="Forks" />
                        <span>{repo.forks}</span>
                    </a>
                </div>
            </div>
        );
    }

    render(): React.ReactNode {
        if (this.props.loading) {
            return (
                <div className="wrapper text">
                    <Icon path={mdiLoading} size={1} title="Loading" spin={1} className="text-icon" />
                    <span className="valign-middle">Loading GitHub data...</span>
                </div>
            );
        }

        if (!this.props.user) {
            return (
                <div className="wrapper text">
                    <Icon path={mdiAlertCircleOutline} size={1} title="Error" className="text-icon" />
                    <span className="valign-middle">No GitHub data...</span>
                </div>
            );
        }

        return (
            <div className="wrapper text-center">
                <div className="text mbl color-primary">GitHub</div>
                <div className="github-user">
                    <a href={this.props.user.url} target="_blank" rel="noopener noreferrer">
                        <img className="github-avatar" src={this.props.user.image} alt="Avatar" />
                    </a>
                    <div className="github-count">
                        <div className="monospace">{this.props.user.repos}</div>
                        <span className="text-smaller">Repositories</span>
                    </div>
                    <div className="github-count">
                        <div className="monospace">{this.props.user.stars}</div>
                        <span className="text-smaller">Stargazers</span>
                    </div>
                    <div className="github-count">
                        <div className="monospace">{this.props.user.followers}</div>
                        <span className="text-smaller">Followers</span>
                    </div>
                </div>
                <div className="github-wrapper ptm mha">
                    <div className="text-smaller mbs">Featured</div>
                    {this.props.top.map(GitHub.renderRepo)}
                    {this.props.featured.map(GitHub.renderRepo)}
                </div>
            </div>
        );
    }
}

export default connect((state: DefaultState): GitHubProps => ({ ...state.github, loading: state.loading }))(GitHub);
