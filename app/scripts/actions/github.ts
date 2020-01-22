import { ActionsObject, makeAction, makeReducer } from '@finn-no/redux-actions';

import { GitHubRepo, GitHubState, ThunkResult } from '../interfaces';

import { getExternal } from '../util/api';
import baseActions, { showToast } from './base';

const featured: string[] = ['tomlin-web', 'iata-utils', 'dotfiles'];

const actions: ActionsObject<GitHubState> = {};

interface GitHubRepoResponse {
    name: string;
    html_url: string;
    language: string;
    forks_count: number;
    stargazers_count: number;
    has_issues: boolean;
    open_issues_count: number;
}

actions.setGitHubUser = makeAction('BASE/SET_GITHUB_USER', (state, { payload }) => ({
    ...state,
    user: {
        name: payload.login,
        image: payload.avatar_url,
        url: payload.html_url,
        repos: payload.public_repos,
        followers: payload.followers,
        following: payload.following,
    },
}));

actions.setGitHubRepos = makeAction('BASE/SET_GITHUB_REPOS', (state, { payload }) => {
    const repositories: GitHubRepo[] = payload.map(
        (repo: GitHubRepoResponse): GitHubRepo => ({
            name: repo.name,
            url: repo.html_url,
            language: repo.language,
            forks: repo.forks_count,
            stars: repo.stargazers_count,
            issues: repo.has_issues ? repo.open_issues_count : null,
        })
    );

    return {
        ...state,
        stars: repositories.map((repo: GitHubRepo): number => repo.stars).reduce((a: number, b: number): number => a + b, 0),
        top: repositories
            .slice()
            .sort((a: GitHubRepo, b: GitHubRepo): number => b.stars - a.stars)
            .slice(0, 3),
        featured: repositories.filter((repo: GitHubRepo): boolean => featured.includes(repo.name)),
    };
});

export const getGitHubData = (): ThunkResult<Promise<void>> => async (dispatch): Promise<void> => {
    dispatch(baseActions.setLoading(true));

    await getExternal('https://api.github.com/users/benct')
        .then(data => dispatch(actions.setGitHubUser(data)))
        .catch(() => dispatch(showToast('Could not load GitHub data...')))
        .finally(() => dispatch(baseActions.setLoading(false)));
    await getExternal('https://api.github.com/users/benct/repos')
        .then(data => dispatch(actions.setGitHubRepos(data || [])))
        .catch(() => dispatch(showToast('Could not load GitHub data...')));
};

export default actions;

export const reducer = makeReducer<GitHubState>(actions);
