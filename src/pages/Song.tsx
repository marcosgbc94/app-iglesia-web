import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHymnal } from '../contexts/HymnalContext';
import { capitalizeTitle, capitalizeWord, splitDescription } from '../utils/StringUtils';
import type { SongParams } from '../types/hymnal';

export const Song: React.FC = () => {
    const { codigo } = useParams<SongParams>();
    const { songs, loading } = useHymnal();

    const song = useMemo(() => {
        return songs.find(s => s.code === codigo);
    }, [songs, codigo]);

    if (loading) {
        return <div className="text-center p-8 dark:text-white">Cargando datos del himnario...</div>;
    }

    if (!song) {
        return (
            <div className="p-4 flex items-center justify-center flex-col h-full">
                <p className="font-bold text-center text-gray-600 dark:text-gray-400">Alabanza No Encontrada</p>
                <Link to="/dashboard" className="bg-blue-500 dark:bg-blue-600 text-white p-2 rounded mt-2">
                    ← Volver al inicio
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-2 px-2">

            <small className="text-gray-600 dark:text-gray-400">
                Código: {song.code} | {capitalizeWord(song.type)}
            </small>

            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {capitalizeWord(song.name)}
            </h1>

            {
                song.info && (
                    <p className="text-gray-600 dark:text-gray-400">
                        {capitalizeWord(song.info)}
                    </p>
                )
            }

            {song.desc && (
                <ul className="list-disc list-inside space-y-1 text-gray-800 mt-3 dark:text-gray-200 opacity-75">
                    {splitDescription(song.desc).map((phrase, index) => (
                        <li key={index} className="pl-2 mb-0">
                            {capitalizeTitle(phrase)}
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-4">

                {song.body.filter((_, i) => i > 0 && i < song.body.length - 1).map((slide, index) => (
                    <div
                        key={index}
                        className=""
                    >
                        <hr className="my-4 px-2 text-gray-200 dark:text-gray-800" />

                        <small className="text-gray-600 dark:text-gray-400 mb-2">{index + 1}</small>

                        <div
                            className="prose prose-lg dark:prose-invert text-gray-900 dark:text-gray-100"
                            dangerouslySetInnerHTML={{ __html: slide.slide }}
                        />
                    </div>
                ))}

            </div>

            <div className="mt-8 pb-3">
                <Link to="/dashboard" className="bg-blue-500 dark:bg-blue-600 text-white p-2 rounded">
                    ← Volver al inicio
                </Link>
            </div>
        </div>
    );
};