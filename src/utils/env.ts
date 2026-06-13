export const isBrowser = typeof window !== 'undefined';

export const getEnvVar = (key: string): string | undefined => {
    if (typeof process !== 'undefined' && process.env) {
        return process.env[key];
    }
    return undefined;
};