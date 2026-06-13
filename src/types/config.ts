export interface WpConfig {
    restUrl?: string;
    graphqlUrl?: string;
    authUrl?: string;
    refreshUrl?: string;
    cacheTtl?: number;
    headers?: Record<string, string>;
    debug?: boolean;
    defaultParams?: Record<string, any>;
}