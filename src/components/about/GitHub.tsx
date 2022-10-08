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

import { useGitHub } from '@/data/base';

import { GitHubRepo } from '@/interfaces';
import { Loading } from '@/components/page/Loading';
import { Box } from '@/components/page/Box';

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
        <div className="flex justify-between gap-8 items-center" key={repo.name}>
            <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer" className="truncate">
                <Icon
                    path={getLanguageIcon(repo.language)}
                    size="22px"
                    title={repo.language}
                    className="inline align-middle text-secondary dark:text-secondary-dark"
                />
                <span className="text-14 align-middle pl-8">{repo.name}</span>
            </a>
            <div className="grid grid-cols-3 gap-8">
                <a
                    href={`${repo.htmlUrl}/stargazers`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-end gap-8 items-center sm:w-64">
                    <Icon path={mdiStarOutline} size="22px" title="Stargazers" className="text-neutral dark:text-neutral-dark" />
                    <span className="font-mono text-14">{repo.stargazersCount}</span>
                </a>
                <a
                    href={`${repo.htmlUrl}/issues`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-end gap-8 items-center sm:w-64">
                    <Icon path={mdiAlertCircleOutline} size="22px" title="Open Issues" className="text-neutral dark:text-neutral-dark" />
                    <span className="font-mono text-14">{repo.openIssuesCount}</span>
                </a>
                <a
                    href={`${repo.htmlUrl}/network/members`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-end gap-8 items-center sm:w-64">
                    <Icon path={mdiSourceFork} size="22px" title="Forks" className="text-neutral dark:text-neutral-dark" />
                    <span className="font-mono text-14">{repo.forksCount}</span>
                </a>
            </div>
        </div>
    );

    return (
        <Box title="GitHub">
            <Loading isLoading={loading} text="Loading data...">
                {data?.user ? (
                    <>
                        <div className="flex justify-center items-center gap-x-24">
                            <a href={data.user.htmlUrl} target="_blank" rel="noopener noreferrer">
                                <Image src={data.user.avatarUrl} width={48} height={48} alt="Avatar" className="rounded-full" />
                            </a>
                            <div className="text-center">
                                <div className="font-mono">{data.user.publicRepos}</div>
                                <span className="text-12">Repositories</span>
                            </div>
                            <div className="text-center">
                                <div className="font-mono">{data.stars}</div>
                                <span className="text-12">Stargazers</span>
                            </div>
                            <div className="text-center">
                                <div className="font-mono">{data.user.followers}</div>
                                <span className="text-12">Followers</span>
                            </div>
                        </div>
                        <div className="mt-32 mx-auto max-w-max space-y-12">
                            <div className="text-12 text-center mb-8">Featured</div>
                            {data.top.map(renderRepo)}
                            {data.featured.map(renderRepo)}
                        </div>
                    </>
                ) : (
                    <div className="flex justify-center gap-x-16">
                        <Icon path={mdiAlertCircleOutline} size={1} title="Error" id="error-icon" />
                        <span>Could not fetch data...</span>
                    </div>
                )}
            </Loading>
        </Box>
    );
};
