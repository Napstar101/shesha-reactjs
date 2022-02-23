export const getCurrentUrl = (): string => {
    return typeof window !== 'undefined'
        ? window.location?.pathname ?? ''
        : '';
}

export const getCurrentQueryString = (): string => {
    return typeof window !== 'undefined'
        ? window.location?.search ?? ''
        : '';
}

export const getCurrentUrlWithQueryString = (): string => {
    return getCurrentUrl() + getCurrentQueryString();
}

export const normalizeUrl = (url: string): string => {
    return url === '/'
        ? url
        : (url ?? '').endsWith('/')
            ? (url || '').substring(0, url.length - 1)
            : url;
}

export const isSameUrls = (url1: string, url2: string): boolean => {
    return normalizeUrl(url1) === normalizeUrl(url2);
}

export const getLoginUrlWithReturn = (landingPage: string, unauthorizedRedirectUrl: string) => {
    const currentPath = getCurrentUrl();

    const redirectUrl = isSameUrls(currentPath, landingPage) || isSameUrls(currentPath, unauthorizedRedirectUrl)
        ? ''
        : `/?returnUrl=${encodeURIComponent(getCurrentUrlWithQueryString())}`;

    return `${unauthorizedRedirectUrl}${redirectUrl}`;
};


export interface QueryStringParams {
    [key: string]: string | number;
}
export const getQueryParams = (): QueryStringParams => {
    const qs = getCurrentQueryString() ?? '';
    if (!Boolean(qs))
        return {};
    
    const parsed = qs.substring(1).split('&').reduce((q, query) => {
        const chunks = query.split('=');
        const key = chunks[0];
        const decodedValue = decodeURIComponent(chunks[1]);
        const value = isNaN(Number(decodedValue)) ? decodedValue : Number(decodedValue);
        q[key] = value;
        return q;
    }, {} as QueryStringParams);

    return parsed;
}

export const getQueryParam = (name: string) => {
    const result = getQueryParams()[name];

    return result;
}