import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { getAuthToken, refreshAuthToken } from '@utils/auth';

interface WpRestConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
  authToken?: string;
}

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

export class WpRestClient {
  public client: AxiosInstance;
  private pendingTokenRefresh: Promise<string | null> | null = null;

  constructor(config: Partial<WpRestConfig> = {}) {
    this.client = axios.create({
      baseURL: config.baseURL || '',
      timeout: config.timeout || 5000,
      headers: {
        'Content-Type': 'application/json',
        ...(config.headers || {}),
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(async (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfigWithRetry;

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await this.handleTokenRefresh();
            if (newToken) {
              if (!originalRequest.headers) {
                originalRequest.headers = {};
              }
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private async handleTokenRefresh(): Promise<string | null> {
    if (!this.pendingTokenRefresh) {
      this.pendingTokenRefresh = refreshAuthToken('/jwt-auth/v1/token/refresh').finally(() => {
        this.pendingTokenRefresh = null;
      });
    }
    return this.pendingTokenRefresh;
  }

  /**
   * Sends a GET request to the WordPress REST API.
   * @param endpoint API endpoint (e.g., '/wp/v2/posts')
   * @param params Query parameters.
   * @returns Promise containing the response data.
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const response = await this.client.get<T>(endpoint, { params });
    return response.data;
  }

  /**
   * Sends a POST request to the WordPress REST API.
   * @param endpoint API endpoint (e.g., '/wp/v2/posts')
   * @param data Request body.
   * @returns Promise containing the response data.
   */
  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(endpoint, data);
    return response.data;
  }

  /**
   * Sends a PUT request to the WordPress REST API.
   * @param endpoint API endpoint (e.g., '/wp/v2/posts/1')
   * @param data Request body.
   * @returns Promise containing the response data.
   */
  async put<T>(endpoint: string, data?: any): Promise<T> {
    try {
      const response = await this.client.put<T>(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Sends a DELETE request to the WordPress REST API.
   * @param endpoint API endpoint (e.g., '/wp/v2/posts/1')
   * @returns Promise containing the response data.
   */
  async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await this.client.delete<T>(endpoint);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Handles Axios errors and throws a more informative error.
   * @param error The Axios error.
   * @throws {Error} A more descriptive error.
   */
  private handleError(error: AxiosError): Error {
    if (error.response) {
      throw new Error(
        `Request failed with status ${error.response.status}: ${JSON.stringify(
          error.response.data
        )}`
      );
    } else if (error.request) {
      throw new Error('No response received from server');
    } else {
      throw new Error(error.message);
    }
  }
}
