import React, { createContext, useContext, useMemo, useState } from 'react';
import { useHymnalData } from '../hooks/useHymnalData';
import type { Song, HymnalContextType } from '../types/hymnal';


const HymnalContext = createContext<HymnalContextType | undefined>(undefined);

export const HymnalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: songs, loading, error } = useHymnalData();

    const [searchQuery, setSearchQuery] = useState('');

    const filteredSongs: Song[] = useMemo(() => {
        if (!searchQuery) {
            return songs;
        }
        const query = searchQuery.toLowerCase().trim();

        return songs.filter(song =>
            song.name.toLowerCase().includes(query) ||
            song.code.toLowerCase().includes(query) ||
            song.info.toLowerCase().includes(query)
        );
    }, [songs, searchQuery]);

    const contextValue: HymnalContextType = {
        songs,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        filteredSongs,
    };

    return (
        <HymnalContext.Provider value={contextValue}>
            {children}
        </HymnalContext.Provider>
    );
};

export const useHymnal = () => {
    const context = useContext(HymnalContext);
    if (context === undefined) {
        throw new Error('useHymnal debe ser usado dentro de un HymnalProvider');
    }
    return context;
};