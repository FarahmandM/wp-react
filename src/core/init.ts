import { WpConfig } from '@models/config';
import { initialize } from './config';

export function initializeWpReact(config: Partial<WpConfig> = {}) {
  initialize(config);
  return {
    version: '__VERSION__'
  };
}