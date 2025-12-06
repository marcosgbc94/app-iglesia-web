import { useHymnal } from '../contexts/HymnalContext';
import { useNavigate } from 'react-router-dom';
import { capitalizeWord } from '../utils/StringUtils';
import type { SongGroup } from '../types/hymnal';
import { useMemo } from 'react';

export const Search: React.FC = () => {

    const { songs, loading } = useHymnal();
    const navigate = useNavigate();

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCode = event.target.value;
        if (selectedCode) {
            navigate(`/song/${selectedCode}`);
        }
    };

    const groupedSongs: SongGroup = useMemo(() => {
        if (loading || songs.length === 0) return {};

        return songs.reduce((groups, song) => {
            const initial = song.code.charAt(0).toUpperCase();

            if (!groups[initial]) {
                groups[initial] = [];
            }
            groups[initial].push(song);

            return groups;
        }, {} as SongGroup);
    }, [songs, loading]);


    const initials = Object.keys(groupedSongs).sort();

    return (
        <select
            id="song-select"
            onChange={handleSelectChange}
            className="w-full p-3 bg-slate-200 dark:bg-slate-800 max-w-4xl text-gray-900 dark:text-gray-100"
            disabled={loading}
            value={""}
        >
            <option value="" disabled>
                {loading ? 'Cargando alabanzas...' : 'Seleccione una alabanza...'}
            </option>

            {initials.map((initial) => (
                <optgroup
                    key={initial}
                    label={initial}
                >
                    {groupedSongs[initial].filter(song => !song.cc).map((song) => (
                        <option key={song.code} value={song.code}>
                            {capitalizeWord(song.name)} {song.info ? ' | ' + capitalizeWord(song.info) : ''}
                        </option>
                    ))}
                </optgroup>
            ))}
        </select>
    );
};