import { WpUser } from './user';

interface WpCategoryBase {
  id: number;
  date_gmt: string;
  modified_gmt: string;
}

interface WpCategory extends WpCategoryBase {
  title: { rendered: string };
  slug: string;
  _embedded?: {
    author?: WpUser[];
  };
}

export type { WpCategory };
