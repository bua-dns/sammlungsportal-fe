export function normalizeStringForSearch(params) {
    let { 
        str, // der zu normalisierende String
        caseTo // 'lower' oder 'keep' (default: 'lower')
        // könnte noch auf Sprachsensitivität erweitert werden
    } = params;
    if (!str || typeof str !== 'string') return '';
    if (caseTo === 'lower') {
        str = str.toLowerCase();
    }
    // Bereiningung
    str = str
        .replace(/\s+/g, ' ')
        .replace(/,/g, ' ')
        .replace(/\./g, ' ')
        .replace(/\s+/g, ' ')
        .trim()

    const replacements = {
        'ß': 'ss',
        'æ': 'ae', 'œ': 'oe',
        'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'Ä': 'Ae', 'Ö': 'Oe', 'Ü': 'Ue',
        'ł': 'l',
        'ś': 's', 'ą': 'a', 'ę': 'e',
        'ď': 'd', 'ě': 'e', 'ň': 'n', 'ř': 'r', 'š': 's', 'ť': 't', 'ů': 'u', 'ý': 'y', 'ž': 'z',
        'á': 'a', 'é': 'e', 'í': 'i', 'ú': 'u',  
        'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U', 'Ý': 'Y',
        'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u',
        'À': 'A', 'È': 'E', 'Ì': 'I', 'Ò': 'O', 'Ù': 'U',
        'â': 'a', 'ê': 'e', 'î': 'i', 'ô': 'o', 'û': 'u',
        'Â': 'A', 'Ê': 'E', 'Î': 'I', 'Ô': 'O', 'Û': 'U',
        'ã': 'a', 'õ': 'o', 'ñ': 'n',
        'Ã': 'A', 'Õ': 'O', 'Ñ': 'N',
        'ç': 'c', 'Ç': 'C', 'č': 'c', 
        'Č': 'C', 'Ď': 'D', 'Ě': 'E', 'Ň': 'N', 'Ř': 'R', 'Š': 'S', 'Ť': 'T', 'Ů': 'U', 'Ž': 'Z',
        'ľ': 'l', 'Ľ': 'L', 'ŕ': 'r', 'Ŕ': 'R',
        'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z',
        'ć': 'c', 'ń': 'n', 'ó': 'o', 'ź': 'z', 'ż': 'z',
        'Ā': 'A', 'ā': 'a', 'Ē': 'E', 'ē': 'e', 'Ī': 'I', 'ī': 'i', 'Ō': 'O', 'ō': 'o', 'Ū': 'U', 'ū': 'u',
        'Ă': 'A', 'ă': 'a', 'Ĕ': 'E', 'ĕ': 'e', 'Ğ': 'G', 'ğ': 'g', 'Ĭ': 'I', 'ĭ': 'i', 'Ŏ': 'O', 'ŏ': 'o', 'Ŭ': 'U', 'ŭ': 'u',
        'Ą': 'A', 'Į': 'I', 'į': 'i', 'Ų': 'U', 'ų': 'u',
        'ï': 'i', 'Ï': 'I', 'ÿ': 'y', 'Ÿ': 'Y',
        
    };
    let normalizedString = str.split('').map(char => replacements[char] || char).join('');
       
    // Remove diacritical marks with a regex
    normalizedString = normalizedString.replace(/[\u0300-\u036f]/g, '');

    return normalizedString;
}