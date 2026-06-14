import { WpUser } from '../../user';

export interface WpRestUserParams {
  per_page?: number;
  page?: number;
}

export interface WpRestUserResponse extends Array<WpUser> {}
