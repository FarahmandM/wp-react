import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WpUser } from '@models/user';
import { WpRestClient } from '@api/WpRestClient';
import { setAuthToken, setRefreshToken, clearTokens, refreshAuthToken } from '@utils/auth';
import { useWpConfig } from './WpConfigProvider';

export interface AuthContextValue {
  user: WpUser | null;
  error: string | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<string | null>;
}

export const AuthContext = createContext<AuthContextValue>(null!);

interface WpAuthProviderProps {
  children: ReactNode;
}

export const WpAuthProvider: React.FC<WpAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<WpUser | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const config = useWpConfig();

  const login = async (credentials: { username: string; password: string }) => {
    try {
      setError(undefined);
      setIsLoading(true);

      const client = new WpRestClient({ baseURL: config.restUrl });

      const data = await client.post<any>('/jwt-auth/v1/token', {
        username: credentials.username,
        password: credentials.password,
      });

      const wpUser: WpUser = {
        id: 0,
        name: data.user_display_name || data.user_nicename || credentials.username,
        username: data.user_nicename || credentials.username,
        email: data.user_email || '',
        token: data.token,
      };

      setUser(wpUser);

      setAuthToken(data.token);
      if (data.refresh_token) {
        setRefreshToken(data.refresh_token);
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(msg);
      console.error('Login error:', msg);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(undefined);
    clearTokens();
  };

  const handleRefreshToken = async (): Promise<string | null> => {
    try {
      const refreshUrl = config.refreshUrl || `${config.restUrl}/jwt-auth/v1/token/refresh`;
      const newToken = await refreshAuthToken(refreshUrl);

      if (newToken && user) {
        setUser({ ...user, token: newToken });
      }
      return newToken;
    } catch (error) {
      logout();
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshToken: handleRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a WpAuthProvider');
  }
  return context;
};
