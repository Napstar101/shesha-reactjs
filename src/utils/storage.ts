export const getLocalStorage = (): Storage => {
    return typeof window === "undefined"
        ? undefined
        : localStorage;
}