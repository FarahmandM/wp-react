import { GraphQLClient, RequestDocument, Variables } from 'graphql-request';
import { getAuthToken, refreshAuthToken } from '@utils/auth';
import { useAuth } from '@hooks/useAuth';
import { getEnvVar } from '@utils/env';

interface WpGraphQLConfig {
    endpoint: string;
    headers?: Record<string, string>;
    autoRefreshToken?: boolean;
}

const defaultConfig: WpGraphQLConfig = {
    endpoint: getEnvVar('REACT_APP_WP_GRAPHQL_URL') || '',
    headers: {
        'Content-Type': 'application/json',
    },
    autoRefreshToken: true,
};

interface GraphQLClientResponse<T> {
    data: T;
    errors?: any;
    extensions?: any;
}

export class WpGraphQLClient {
    private client: GraphQLClient;
    private config: WpGraphQLConfig;
    private refreshPromise: Promise<string | null> | null = null;

    constructor(config: Partial<WpGraphQLConfig> = {}) {
        this.config = {
            ...defaultConfig,
            ...config,
            headers: {
                ...defaultConfig.headers,
                ...(config.headers || {}),
            },
        };

        this.client = new GraphQLClient(this.config.endpoint, {
            headers: this.getHeaders(),
        });
    }

    private getHeaders(token?: string) {
        const authToken = token || getAuthToken();
        return {
            ...this.config.headers,
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        };
    }

    private async handleAuthError(error: any): Promise<never> {
        if (this.config.autoRefreshToken && error.response?.status === 401) {
            try {
                const newToken = await this.refreshToken();
                if (newToken) {
                    // Retry with new token
                    this.client.setHeaders(this.getHeaders(newToken));
                    throw { shouldRetry: true };
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
            }
        }
        throw error;
    }

    private async refreshToken(): Promise<string | null> {
        if (this.refreshPromise) {
            return this.refreshPromise;
        }

        this.refreshPromise = refreshAuthToken('/jwt-auth/v1/token/refresh')
            .finally(() => {
                this.refreshPromise = null;
            });

        return this.refreshPromise;
    }

    /**
     * Execute a GraphQL query or mutation with automatic token refresh
     * @param document The GraphQL query/mutation document
     * @param variables Optional variables for the operation
     * @param options Additional request options
     * @returns Promise containing the response data of type T
     */
    async request<T = any>(
        document: RequestDocument,
        variables?: Variables,
        options?: { noRetry?: boolean }
    ): Promise<T> {
        try {
            return await this.client.request<T>(document, variables);
        } catch (error: any) {
            if (options?.noRetry) throw error;

            try {
                await this.handleAuthError(error);
                // If we get here, token was refreshed - retry once
                return this.request<T>(document, variables, { noRetry: true });
            } catch (finalError) {
                if (typeof finalError === 'object' && finalError !== null && 'shouldRetry' in finalError) {
                    if ((finalError as any).shouldRetry) {
                        return await this.client.request<T>(document, variables);
                    }
                }
                throw finalError;
            }
        }
    }

    /**
     * Execute a raw GraphQL request with full control over headers
     */
    async rawRequest<T = any>(
        query: string,
        variables?: Variables,
        headers?: Record<string, string>
    ): Promise<GraphQLClientResponse<T>> {
        return this.client.rawRequest<T>(query, variables, {
            ...this.getHeaders(),
            ...headers,
        });
    }
}

// Singleton pattern with initialization safety
let clientInstance: WpGraphQLClient | null = null;

export const initializeGraphQLClient = (config: Partial<WpGraphQLConfig> = {}): void => {
    clientInstance = new WpGraphQLClient(config);
};

export const getGraphQLClient = (): WpGraphQLClient => {
    if (!clientInstance) {
        throw new Error(
            'GraphQL client not initialized. Call initializeGraphQLClient() first.'
        );
    }
    return clientInstance;
};

// React hook version
export const useGraphQLClient = () => {
    const { refreshToken } = useAuth();

    return {
        request: async <T = any>(
            document: RequestDocument,
            variables?: Variables
        ): Promise<T> => {
            const client = getGraphQLClient();
            try {
                return await client.request<T>(document, variables);
            } catch (error: any) {
                if (error.response?.status === 401) {
                    await refreshToken();
                    return client.request<T>(document, variables);
                }
                throw error;
            }
        }
    };
};