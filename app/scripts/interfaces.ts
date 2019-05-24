export interface DefaultState {
    isLoggedIn: boolean;
    showMenu: boolean;
    circleIcons: boolean;
    toast: string | null;
    loading: boolean;

    quote: QuoteState;
    home: HomeState;
    files: FileState;
    links: LinkState;
    media: MediaState & MediaTypeState;
    admin: AdminState;
    pagination: PaginationState;
}

export interface QuoteState {
    text: string | null;
    author: string | null;
    current: number;
}

export interface HomeState {
    temperature: HomeTemperature;
    consumption: HomeConsumption;
    day: boolean;
}

export interface HomeTemperature {
    livingroom?: number;
    office?: number;
    bedroom?: number;
    storeroom?: number;
    kitchen?: number;
    bathroom?: number;
    outside?: number;
}

export interface HomeConsumption {
    tv?: number;
    pc?: number;
}

export interface FileState {
    cwd: string;
    content: FileItem[];
    focused: number | null;
    preview: FilePreview | null;
    uploading: boolean;
}

export interface FileItem {
    dir: boolean;
    type: string;
    name: string;
    short: string;
    icon: string;
    size: string;
    perms: string;
    date: string;
    href: string;
    preview: object;
}

export interface FilePreview {
    src: string;
    image: string;
    content: string;
}

export interface LinkState {
    content: string | null;
    loading: boolean;
}

export type MediaType = 'movie' | 'tv' | 'watchlist';

export interface MediaTypeState {
    [key: string]: MediaResults | null;
}

export interface MediaState {
    item: MediaItemEntry | null;
    showModal: boolean;
    search: MediaSearchItemEntry[];
    existing: number[];
    sort: string;
    stats: {
        movie: MediaStatsType;
        tv: MediaStatsType;
    };
}

export interface MediaResults {
    results: MediaItemEntry[];
    page: number;
    total_pages: number;
    total_results: number;
}

export interface MediaItemEntry {
    type: MediaType;
    id: number;
    title: string;
    original_title?: string;
    name: string;
    original_name?: string;
    overview: string;
    poster: string;
    genres: string;
    release_date: string | null;
    release_year: string | null;
    end_year: string | null;
    imdb_id: string | null;
    rating: number;
    votes: number;
    runtime: number | null;
    budget: number;
    revenue: number;
    tagline: string;
    seen: boolean;
    favourite: boolean;
    language: string;
    number_of_seasons?: number;
    number_of_episodes?: number;
    seen_episodes: number;
    seasons?: MediaSeasonEntry[];
    series_type: string;
    status: string;
    networks: string;
    created_by: string;
    production_companies: string;
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
    media_type: string;
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
    visits: Visit[];
    notes: Note[];
}

export interface AdminStats {
    [key: string]: number;
}

export interface Log {
    message: string;
    details: string;
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
