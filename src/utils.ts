/**
 * Maps a programming language string to a FontAwesome icon name.
 */
export function mapLanguageToFontAwesome(language: string | null | undefined): string {
    if (!language) return 'code';
    
    switch (language.toLowerCase()) {
        case 'java':
            return 'java';
        case 'html':
        case 'svelte':
        case 'vue':
            return 'html5';
        case 'css':
            return 'css3-alt';
        case 'kotlin':
        case 'android':
            return 'android';
        case 'typescript':
        case 'javascript':
            return 'js';
        case 'python':
            return 'python';
        case 'rust':
            return 'rust';
        case 'go':
            return 'golang';
        case 'swift':
            return 'swift';
        default:
            return 'code';
    }
}
