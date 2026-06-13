import { WpPost } from '../../post';

export interface WpRestPostParams {
    per_page?: number;
    page?: number;
}

export interface WpRestPostResponse extends Array<WpPost> { }
