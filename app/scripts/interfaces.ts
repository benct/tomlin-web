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
    content: object[] | null;
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
    stats: object;
    logs: object[];
    visits: object[];
    notes: object[];
}

export interface PaginationState {
    enabled: boolean;
    current: number;
    total: number;
}
