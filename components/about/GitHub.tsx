import { FC, ReactElement } from 'react';
import Image from 'next/image';
import { Icon } from '@mdi/react';
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

import { useGitHub } from '../../data/base';
import { Loading } from '../page/Loading';
import { GitHubRepo } from '../../interfaces';

export const GitHub: FC = () => {
    const { data, loading } = useGitHub();

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

    const renderRepo = (repo: GitHubRepo): ReactElement => (
        <div className="github-repo mbm" key={repo.name}>
            <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer" className="truncate">
                <Icon path={getLanguageIcon(repo.language)} size="22px" title={repo.language} className="text-icon" id="langIcon" />
                <span className="valign-middle text-small color-base">{repo.name}</span>
            </a>
            <div className="github-repo-state no-wrap">
                <a href={`${repo.htmlUrl}/stargazers`} target="_blank" rel="noopener noreferrer">
                    <Icon path={mdiStarOutline} size="22px" title="Stargazers" id="starIcon" />
                    <span className="color-base">{repo.stargazersCount}</span>
                </a>
                <a href={`${repo.htmlUrl}/issues`} target="_blank" rel="noopener noreferrer">
                    <Icon path={mdiAlertCircleOutline} size="22px" title="Open Issues" id="issueIcon" />
                    <span className="color-base">{repo.openIssuesCount}</span>
                </a>
                <a href={`${repo.htmlUrl}/network/members`} target="_blank" rel="noopener noreferrer">
                    <Icon path={mdiSourceFork} size="22px" title="Forks" id="forkIcon" />
                    <span className="color-base">{repo.forksCount}</span>
                </a>
            </div>
        </div>
    );

    return (
        <Loading isLoading={loading} text="Loading GitHub data..." className="wrapper">
            {data?.user ? (
                <div className="wrapper text-center">
                    <div className="text mbl color-primary">GitHub</div>
                    <div className="github-user">
                        <a href={data.user.htmlUrl} target="_blank" rel="noopener noreferrer">
                            <Image src={data.user.avatarUrl} width={48} height={48} alt="Avatar" style={{ borderRadius: '100%' }} />
                        </a>
                        <div className="github-count">
                            <div className="monospace">{data.user.publicRepos}</div>
                            <span className="text-smaller">Repositories</span>
                        </div>
                        <div className="github-count">
                            <div className="monospace">{data.stars}</div>
                            <span className="text-smaller">Stargazers</span>
                        </div>
                        <div className="github-count">
                            <div className="monospace">{data.user.followers}</div>
                            <span className="text-smaller">Followers</span>
                        </div>
                    </div>
                    <div className="github-wrapper ptm mha">
                        <div className="text-smaller mbs">Featured</div>
                        {data.top.map(renderRepo)}
                        {data.featured.map(renderRepo)}
                    </div>
                </div>
            ) : (
                <div className="wrapper text">
                    <Icon path={mdiAlertCircleOutline} size={1} title="Error" className="text-icon" id="githubIcon" />
                    <span className="valign-middle">No GitHub data...</span>
                </div>
            )}
        </Loading>
    );
};
