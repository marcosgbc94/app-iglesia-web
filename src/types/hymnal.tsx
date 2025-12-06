export interface HymnalData {
    praise: Song[];
}

interface Body {
    slide: string;
}

export interface Song {
    code: string;
    name: string;
    info: string;
    type: string;
    desc: string;
    cc: boolean;
    body: Body[];
}

export interface UseHymnalResult {
    data: Song[];
    loading: boolean;
    error: string | null;
}

export interface HymnalContextType {
    songs: Song[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filteredSongs: Song[];
}

export interface SongGroup {
    [initial: string]: Song[];
}

export type SongParams = {
    codigo?: string;
};