export const getCurrentUrl = (): string => {
    return typeof window !== 'undefined'
        ? window.location?.pathname ?? ''
        : '';
}

export const normalizeUrl = (url: string): string => {
    return url === '/' 
        ? url 
        : (url ?? '').endsWith('/') 
            ? (url || '').substring(0, url.length - 1) 
            : url;
}