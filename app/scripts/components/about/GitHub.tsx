import React from 'react';
import { connect } from 'react-redux';
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
    mdiSourceFork,
    mdiStarOutline,
} from '@mdi/js';

import { DefaultState, GitHubRepo, GitHubState, ThunkDispatchProp } from '../../interfaces';
import { getGitHubData } from '../../actions/github';

import Loading from '../page/Loading';

type GitHubProps = GitHubState & Pick<DefaultState, 'loading'>;

const GitHub: React.FC<GitHubProps & ThunkDispatchProp> = props => {
    React.useEffect(() => {
        if (!props.user) {
            props.dispatch(getGitHubData());
        }
    }, []);

    const getLanguageIcon = (language: string): string => {
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
    };

    const renderRepo = (repo: GitHubRepo): React.ReactElement => (
        <div className="github-repo mbm" key={repo.name}>
            <a href={repo.url} target="_blank" rel="noopener noreferrer" className="truncate">
                <Icon path={getLanguageIcon(repo.language)} size="22px" title={repo.language} className="text-icon" />
                <span className="valign-middle text-small color-base">{repo.name}</span>
            </a>
            <div className="github-repo-state no-wrap">
                <a href={`${repo.url}/stargazers`} target="_blank" rel="noopener noreferrer">
                    <Icon path={mdiStarOutline} size="22px" title="Stargazers" />
                    <span className="color-base">{repo.stars}</span>
                </a>
                {repo.issues && (
                    <a href={`${repo.url}/issues`} target="_blank" rel="noopener noreferrer">
                        <Icon path={mdiAlertCircleOutline} size="22px" title="Open Issues" />
                        <span className="color-base">{repo.issues}</span>
                    </a>
                )}
                <a href={`${repo.url}/network/members`} target="_blank" rel="noopener noreferrer">
                    <Icon path={mdiSourceFork} size="22px" title="Forks" />
                    <span className="color-base">{repo.forks}</span>
                </a>
            </div>
        </div>
    );

    return (
        <Loading isLoading={props.loading} text="Loading GitHub data..." className="wrapper">
            {props.user ? (
                <div className="wrapper text-center">
                    <div className="text mbl color-primary">GitHub</div>
                    <div className="github-user">
                        <a href={props.user.url} target="_blank" rel="noopener noreferrer">
                            <img className="github-avatar" src={props.user.image} alt="Avatar" />
                        </a>
                        <div className="github-count">
                            <div className="monospace">{props.user.repos}</div>
                            <span className="text-smaller">Repositories</span>
                        </div>
                        <div className="github-count">
                            <div className="monospace">{props.stars}</div>
                            <span className="text-smaller">Stargazers</span>
                        </div>
                        <div className="github-count">
                            <div className="monospace">{props.user.followers}</div>
                            <span className="text-smaller">Followers</span>
                        </div>
                    </div>
                    <div className="github-wrapper ptm mha">
                        <div className="text-smaller mbs">Featured</div>
                        {props.top.map(renderRepo)}
                        {props.featured.map(renderRepo)}
                    </div>
                </div>
            ) : (
                <div className="wrapper text">
                    <Icon path={mdiAlertCircleOutline} size={1} title="Error" className="text-icon" />
                    <span className="valign-middle">No GitHub data...</span>
                </div>
            )}
        </Loading>
    );
};

export default connect((state: DefaultState): GitHubProps => ({ ...state.github, loading: state.loading }))(GitHub);
