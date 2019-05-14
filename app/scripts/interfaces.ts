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
    media: MediaState;
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
    content: object[];
    focused: number | null;
    preview: object | null;
    uploading: boolean;
}

export interface LinkState {
    content: string | null;
    loading: boolean;
}

export interface MediaState {
    movie: object[] | null;
    tv: object[] | null;
    watchlist: object[] | null;
    search: object[];
    existing: object[];
    showModal: boolean;
    item: object | null;
    sort: string;
    stats: MediaStats;
}

export interface MediaStats {
    movie: object;
    tv: object;
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
}
