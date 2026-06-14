import { useMemo } from 'react';
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useAuth } from '@hooks/useAuth';
import { WpRestClient } from '@api/WpRestClient';
import { useWpConfig } from '@components/providers/WpConfigProvider';

export const useApiClient = () => {
  const { user, refreshToken } = useAuth();
  const { restUrl } = useWpConfig();

  //const client = new WpRestClient({ baseURL: restUrl });
  const client = useMemo(() => {
    const instance = new WpRestClient({ baseURL: restUrl });

    instance.client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      if (user?.token) {
        config.headers.set('Authorization', `Bearer ${user.token}`);
      }
      return config;
    });

    instance.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          const newToken = await refreshToken();
          if (error.config && error.config.headers) {
            error.config.headers['Authorization'] = `Bearer ${newToken}`;
          }
          return instance.client(error.config as InternalAxiosRequestConfig);
        }

        return Promise.reject(error);
      }
    );

    return instance;
  }, [user?.token, refreshToken, restUrl]);

  /*
    client.client.interceptors.request.use(config => {
        if (user?.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    });

    client.client.interceptors.response.use(
        response => response,
        async error => {
            if (error.response?.status === 401) {
                const newToken = await refreshToken();
                error.config.headers.Authorization = `Bearer ${newToken}`;
                return client.client(error.config);
            }
            return Promise.reject(error);
        }
    );
    */

  return client;
};
