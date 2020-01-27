import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, Dispatch } from 'redux';

export interface DefaultState {
    showMenu: boolean;
    toast: string | null;
    theme: string;

    loading: boolean;
    loadingOverlay: boolean;

    settings: Settings;
    auth: AuthState;
    home: HomeState;
    quote: QuoteState;
    github: GitHubState;
    files: FileState;
    media: MediaState;
    admin: AdminState;
    pagination: PaginationState;
}

export interface Settings {
    [key: string]: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    redirect: boolean;
    error: boolean;
    loading: boolean;
}

export interface HomeState {
    livingroom?: number;
    outside?: number;
    day?: boolean;
}

export interface QuoteState {
    text: string | null;
    author: string | null;
    current: number;
}

export interface GitHubState {
    user: GitHubUser | null;
    stars: number;
    top: GitHubRepo[];
    featured: GitHubRepo[];
}

export interface GitHubUser {
    name: string;
    image: string;
    url: string;
    repos: number;
    followers: number;
    following: number;
}

export interface GitHubRepo {
    name: string;
    url: string;
    language: string;
    forks: number;
    stars: number;
    issues: number | null;
}

export interface FileState {
    cwd: string;
    content: FileItem[];
    focused: number | null;
    preview: FilePreview | null;
    uploading: boolean;
}

export interface FileItem {
    path: string;
    name: string;
    short: string;
    type: string;
    dir: boolean;
    icon: string;
    size: string;
    files: number;
    perms: string;
    date: string;
    preview: object;
}

export interface FilePreview {
    src: string;
    image: string;
    content: string;
}

export type MediaType = 'movie' | 'tv' | 'watchlist';

export interface MediaState {
    movie: MediaResults<MediaItemEntry> | null;
    tv: MediaResults<MediaItemEntry> | null;
    watchlist: MediaResults<MediaItemEntry> | null;
    item: MediaItemEntry | null;
    sort: string;
    showModal: boolean;
    search: MediaSearchItemEntry[];
    existing: {
        movie: number[];
        tv: number[];
    };
    stats: {
        movie: MediaStatsType;
        tv: MediaStatsType;
    };
}

export interface MediaResults<T extends MediaItemEntry | MediaSearchItemEntry> {
    results: T[];
    page: number;
    total_pages: number;
    total_results: number;
}

export type MediaItemEntry = MediaItemCommon & MediaItemMovie & MediaItemTv;

interface MediaItemCommon {
    type: MediaType;
    id: number;
    imdb_id: string | null;
    title: string;
    original_title?: string;
    overview: string;
    poster: string;
    genres: string;
    language: string;
    release_date: string | null;
    release_year: string | null;
    runtime: number | null;
    rating: number;
    votes: number;
    seen: boolean;
    favourite: boolean;
}

interface MediaItemMovie {
    budget?: number;
    revenue?: number;
    tagline?: string;
}

interface MediaItemTv {
    end_year?: string | null;
    number_of_seasons?: number;
    number_of_episodes?: number;
    seen_episodes?: number;
    seasons?: MediaSeasonEntry[];
    series_type?: string;
    status?: string;
    networks?: string;
    created_by?: string;
    production_companies?: string;
}

export interface MediaSeasonEntry {
    id: number;
    season: number;
    title: string;
    episodes: MediaEpisodeEntry[];
    release_date: string;
}

export interface MediaEpisodeEntry {
    id: number;
    episode: number;
    title: string;
    overview: string;
    seen: boolean;
    release_date: string | null;
}

export interface MediaSearchItemEntry {
    id: number;
    media_type: 'movie' | 'tv';
    title: string;
    original_title?: string;
    name: string;
    original_name?: string;
    overview: string;
    first_air_date: string;
    release_date: string;
    poster_path: string;
    original_language: string;
    vote_count: number;
    vote_average: number;
}

export interface MediaStatsType {
    total?: number;
    seen?: number;
    favourite?: number;
    episodes?: number;
    seen_episodes?: number;
    rating?: number;
    ratings?: MediaStatsEntry[];
    years?: MediaStatsEntry[];
}

export interface MediaStatsEntry {
    score?: number;
    year?: number;
    count: number;
}

export interface AdminState {
    stats: AdminStats;
    logs: Log[];
    flights: Flight[][];
    visits: Visit[];
    notes: Note[];
}

export interface AdminStats {
    [key: string]: number;
}

export interface Log {
    id: number;
    message: string;
    details: string | null;
    path: string | null;
    timestamp: string;
}

export interface Visit {
    ip: string;
    host: string;
    agent: string;
    page: string;
    referer?: string;
    visits: number;
    timestamp: string;
}

export interface Flight {
    [key: string]: string | undefined;
}

export interface Note {
    id?: number;
    title?: string;
    content?: string;
    updated?: string;
}

export interface PaginationState {
    enabled: boolean;
    current: number;
    total: number;
    first: boolean;
    previous: number;
    next: number;
    last: boolean;
    previousPages: number[];
    consecutivePages: number[];
}

export type ThunkResult<R> = ThunkAction<R, DefaultState, undefined, Action>;

export type ThunkDispatchFunc = ThunkDispatch<DefaultState, undefined, Action>;

export interface ThunkDispatchProp {
    dispatch: Dispatch<Action> & ThunkDispatchFunc;
}
