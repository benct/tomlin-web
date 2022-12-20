export interface Settings {
    [key: string]: string;
}

export interface Weather {
    updated: string;
    temperature: number;
    humidity: number;
    clouds: number;
    wind: number;
    direction: number;
    forecast: string | null;
    rain: number | null;
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
    avatarUrl: string;
    htmlUrl: string;
    publicRepos: number;
    followers: number;
    following: number;
}

export interface GitHubRepo {
    name: string;
    htmlUrl: string;
    language: string;
    forksCount: number;
    stargazersCount: number;
    openIssuesCount: number;
}

export interface FinnState {
    [key: string]: FinnEntry[];
}

export interface FinnEntry {
    id: number;
    price: string;
    timestamp: string;
}

export interface FileItem {
    path: string;
    name: string;
    short: string;
    size: string;
    modified?: string;
    ext: string;
    isDir: boolean;
    preview: FilePreviewType | null;
    contentType?: string;
    perms?: string;
    files?: number;
}

export interface FilePreview {
    content: string;
    type: FilePreviewType | null;
    item: FileItem;
}

export type FilePreviewType = 'image' | 'video' | 'text' | null;

export type MediaType = 'movie' | 'tv' | 'watchlist';

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
    release_date: string | null;
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

export interface MediaExisting {
    movie: number[];
    tv: number[];
}

export interface MediaExternal {
    id: number;
    facebook_id: string | null;
    imdb_id: string | null;
    instagram_id: string | null;
    twitter_id: string | null;
}

export interface MediaStats {
    movie: MediaStatsType;
    tv: MediaStatsType;
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

export interface User {
    name: string;
    email: string;
    enabled: boolean;
    created: string;
    lastSeen: string | null;
    roles: string[];
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

export interface PaginationResponse<T> {
    results: T[];
    page: number;
    total_pages: number;
    total_results: number;
}

export interface NextPageProps {
    title?: string;
    standalone?: boolean;
}

export interface PageProps {
    page: number;
}

export interface MediaProps {
    type: MediaType;
    page: number;
    sort: string;
    query: string | null;
}

export interface MediaSearchProps {
    type?: string;
    action?: string;
    page?: number;
    id?: string;
}
