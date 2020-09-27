import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { DefaultState, GitHubRepo, GitHubState } from '../../interfaces';
import { getGitHubData } from '../../actions/base';

import Loading from '../page/Loading';

const GitHub: React.FC = () => {
    const dispatch = useDispatch();
    const state = useSelector<DefaultState, GitHubState & Pick<DefaultState, 'loading'>>((state) => ({
        ...state.github,
        loading: state.loading,
    }));

    useEffect(() => {
        if (!state.user) {
            dispatch(getGitHubData());
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
            <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer" className="truncate">
                <Icon path={getLanguageIcon(repo.language)} size="22px" title={repo.language} className="text-icon" />
                <span className="valign-middle text-small color-base">{repo.name}</span>
            </a>
            <div className="github-repo-state no-wrap">
                <a href={`${repo.htmlUrl}/stargazers`} target="_blank" rel="noopener noreferrer">
                    <Icon path={mdiStarOutline} size="22px" title="Stargazers" />
                    <span className="color-base">{repo.stargazersCount}</span>
                </a>
                <a href={`${repo.htmlUrl}/issues`} target="_blank" rel="noopener noreferrer">
                    <Icon path={mdiAlertCircleOutline} size="22px" title="Open Issues" />
                    <span className="color-base">{repo.openIssuesCount}</span>
                </a>
                <a href={`${repo.htmlUrl}/network/members`} target="_blank" rel="noopener noreferrer">
                    <Icon path={mdiSourceFork} size="22px" title="Forks" />
                    <span className="color-base">{repo.forksCount}</span>
                </a>
            </div>
        </div>
    );

    return (
        <Loading isLoading={state.loading} text="Loading GitHub data..." className="wrapper">
            {state.user ? (
                <div className="wrapper text-center">
                    <div className="text mbl color-primary">GitHub</div>
                    <div className="github-user">
                        <a href={state.user.htmlUrl} target="_blank" rel="noopener noreferrer">
                            <img className="github-avatar" src={state.user.avatarUrl} alt="Avatar" />
                        </a>
                        <div className="github-count">
                            <div className="monospace">{state.user.publicRepos}</div>
                            <span className="text-smaller">Repositories</span>
                        </div>
                        <div className="github-count">
                            <div className="monospace">{state.stars}</div>
                            <span className="text-smaller">Stargazers</span>
                        </div>
                        <div className="github-count">
                            <div className="monospace">{state.user.followers}</div>
                            <span className="text-smaller">Followers</span>
                        </div>
                    </div>
                    <div className="github-wrapper ptm mha">
                        <div className="text-smaller mbs">Featured</div>
                        {state.top.map(renderRepo)}
                        {state.featured.map(renderRepo)}
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

export default GitHub;
