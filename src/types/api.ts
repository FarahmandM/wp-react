import { WpPost } from './post';
import { WpUser } from './user';
import type { AxiosInstance } from 'axios';

declare module '@api/WpRestClient' {
  export const wpRestClient: {
    getInstance: () => AxiosInstance;
  };
}
