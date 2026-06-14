import { getConfig } from './config';

const cache = new Map<string, { value: any; expires: number }>();

export const getCache = <T>(key: string): T | null => {
  const entry = cache.get(key);
  if (!entry || Date.now() > entry.expires) return null;
  return entry.value;
};

export const setCache = (key: string, value: any, ttl?: number): void => {
  cache.set(key, {
    value,
    expires: Date.now() + (ttl || getConfig().cacheTtl!),
  });
};
