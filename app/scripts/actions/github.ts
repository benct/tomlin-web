import makeAction from '../redux/makeAction';
import makeReducer, { Actions } from '../redux/makeReducer';

import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { GitHubRepo, GitHubState } from '../interfaces';

import { externalGet } from '../util/api';
import baseActions from './base';

const featured: string[] = ['tomlin-web', 'iata-utils', 'dotfiles'];

const actions: Actions = {};

actions.setGitHubUser = makeAction(
    'BASE/SET_GITHUB_USER',
    (state, { payload }): GitHubState => ({
        ...state,
        user: {
            name: payload.login,
            image: payload.avatar_url,
            url: payload.html_url,
            repos: payload.public_repos,
            followers: payload.followers,
            following: payload.following,
        },
    })
);

actions.setGitHubRepos = makeAction(
    'BASE/SET_GITHUB_REPOS',
    (state, { payload }): GitHubState => {
        const repositories: GitHubRepo[] = payload.map(
            (repo: any): GitHubRepo => ({
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
            user: {
                ...state.user,
                stars: repositories.map((repo: GitHubRepo): number => repo.stars).reduce((a: number, b: number): number => a + b, 0),
            },
            top: repositories
                .slice()
                .sort((a: GitHubRepo, b: GitHubRepo): number => b.stars - a.stars)
                .slice(0, 3),
            featured: repositories.filter((repo: GitHubRepo): boolean => featured.includes(repo.name)),
        };
    }
);

actions.getGitHubData = (): ThunkAction<Promise<void>, GitHubState, null, AnyAction> => async (dispatch): Promise<void> => {
    dispatch(baseActions.setLoading(true));

    await externalGet('https://api.github.com/users/benct')
        .then((data): void => dispatch(actions.setGitHubUser(data)))
        .catch((): void => dispatch(baseActions.showToast('Could not load GitHub data...')))
        .finally((): void => dispatch(baseActions.setLoading(false)));
    await externalGet('https://api.github.com/users/benct/repos')
        .then((data): void => dispatch(actions.setGitHubRepos(data || [])))
        .catch((): void => dispatch(baseActions.showToast('Could not load GitHub data...')));
};

export default actions;

export const reducer = makeReducer(actions);
