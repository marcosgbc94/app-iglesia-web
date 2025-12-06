export const capitalizeWord = (str: string): string => {
    if (!str) return '';

    return str
        .toLowerCase()
        .split(' ')
        .map(word => {
            if (!word.length) {
                return '';
            }

            const firstLetterMatch = word.match(/[a-záéíóúüñ]/);

            if (firstLetterMatch) {

                const firstLetterIndex: number = firstLetterMatch.index ?? 0;

                const prefix = word.slice(0, firstLetterIndex);

                const capitalizedLetter = word.charAt(firstLetterIndex).toUpperCase();

                const suffix = word.slice(firstLetterIndex + 1);

                return prefix + capitalizedLetter + suffix;

            } else {
                return word;
            }
        })
        .join(' ');
};

export const capitalizeTitle = (str: string): string => {
    if (!str) return '';

    const lowerStr = str.toLowerCase();

    const phrases = lowerStr.split(/(\n|<br\s*\/?>)/i);

    const capitalizedPhrases = phrases.map(phrase => {

        if (!phrase || phrase.match(/(\n|<br\s*\/?>)/i)) {
            return phrase;
        }

        return phrase
            .split(' ')
            .map(capitalizeWord)
            .join(' ');
    });

    return capitalizedPhrases.join('');
};

export const splitDescription = (desc: string): string[] => {
    if (!desc) return [];

    const delimiters = /(\s*<br\s*\/?>\s*|\n\s*)/i;

    const parts = desc.split(delimiters);

    return parts
        .map(part => part.trim())
        .filter(part => part.length > 0 && !delimiters.test(part));
};