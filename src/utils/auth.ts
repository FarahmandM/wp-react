import { isBrowser } from '@utils/env';
import axios from 'axios';

const TOKEN_KEY = 'wp_jwt';
const REFRESH_TOKEN_KEY = 'wp_refresh_token';

export const getAuthToken = (): string | null =>
  isBrowser ? localStorage.getItem(TOKEN_KEY) : null;

export const setAuthToken = (token: string): void => {
  if (isBrowser) localStorage.setItem(TOKEN_KEY, token);
};

export const getRefreshToken = (): string | null =>
  isBrowser ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;

export const setRefreshToken = (token: string): void => {
  if (isBrowser) localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const clearTokens = (): void => {
  if (isBrowser) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

export const refreshAuthToken = async (refreshUrl: string): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await axios.post(refreshUrl, { refresh_token: refreshToken });
    const { token, refresh_token } = response.data;

    setAuthToken(token);
    if (refresh_token) setRefreshToken(refresh_token);
    return token;
  } catch (error) {
    clearTokens();
    throw error;
  }
};
