import React, { createContext, useContext, useMemo } from 'react';
import { WpConfig } from '@models/config';
import { getEnvVar } from '@utils/env';

interface ConfigProviderProps {
  config: Partial<WpConfig>;
  children: React.ReactNode;
  /**
   * If true, will initialize from process.env when no parent config exists
   * @default true
   */
  loadEnvDefaults?: boolean;
}

const ConfigContext = createContext<WpConfig>({} as WpConfig);

export const WpConfigProvider: React.FC<ConfigProviderProps> = ({
  config,
  children,
  loadEnvDefaults = true,
}) => {
  const parentConfig = useContext(ConfigContext);

  const fullConfig = useMemo<WpConfig>(() => {
    // Start with either parent config or env defaults
    const baseConfig = parentConfig.restUrl
      ? parentConfig
      : loadEnvDefaults
        ? {
            restUrl: getEnvVar('REACT_APP_WP_REST_URL') || '',
            graphqlUrl: getEnvVar('REACT_APP_WP_GRAPHQL_URL') || '',
            authUrl: getEnvVar('REACT_APP_JWT_AUTH_URL') || '',
            refreshUrl: getEnvVar('REACT_APP_JWT_REFRESH_URL') || '',
            cacheTtl: parseInt(getEnvVar('REACT_APP_CACHE_TTL') || '300000'),
          }
        : {};

    return {
      ...baseConfig,
      ...config,
    };
  }, [parentConfig, config, loadEnvDefaults]);

  return <ConfigContext.Provider value={fullConfig}>{children}</ConfigContext.Provider>;
};

export const useWpConfig = (): WpConfig => useContext(ConfigContext);
