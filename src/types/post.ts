import { WpUser } from './user';

interface WpPostBase {
  id: number;
  date_gmt: string;
  modified_gmt: string;
}

interface WpPost extends WpPostBase {
  title: { rendered: string };
  content: { rendered: string };
  excerpt: {
    rendered: string;
  };
  slug: string;
  status: 'publish' | 'draft' | 'future';
  type: 'post' | 'page' | 'custom';
  link: string;
  _embedded?: {
    author?: WpUser[];
  };
}

export type { WpPost };
