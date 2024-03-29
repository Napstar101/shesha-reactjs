import { useWebStorage } from './useWebStorage';

export function useSessionStorage<T>(key: string, initialValue?: T): [T, (v: T) => void] {
  return useWebStorage('sessionStorage', key, initialValue);
}
