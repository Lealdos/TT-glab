export function getSessionStorageItem(key: string): string | null {
    return sessionStorage.getItem(key);
}
