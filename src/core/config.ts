import { WpConfig } from '@models/config';
import { getEnvVar } from '@utils/env';

let config: WpConfig = {
  restUrl: getEnvVar('REACT_APP_WP_REST_URL') || '',
  graphqlUrl: getEnvVar('REACT_APP_WP_GRAPHQL_URL') || '',
  authUrl: getEnvVar('REACT_APP_JWT_AUTH_URL') || '',
  cacheTtl: parseInt(getEnvVar('REACT_APP_CACHE_TTL') || '300000'),
};

export const initialize = (userConfig: Partial<WpConfig>): void => {
  config = { ...config, ...userConfig };
};

export const getConfig = (): WpConfig => config;
