import { useState, useEffect } from 'react';

import type { UseHymnalResult, Song, HymnalData } from '../types/hymnal';

export const useHymnalData = (): UseHymnalResult => {
    const [data, setData] = useState<Song[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('../public/data.hymnal.json', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error al cargar el himnario: ${response.status} ${response.statusText}`);
                }

                const json: HymnalData = await response.json();

                setData(json.praise);

            } catch (err) {
                if (err instanceof Error) {
                    setError(`Error: ${err.message}. Asegúrate de que /hymnal.json sea accesible y tenga formato JSON válido.`);
                } else {
                    setError('Ocurrió un error desconocido durante la carga de datos.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};