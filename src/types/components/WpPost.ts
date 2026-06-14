import { WpPost } from '@models/post';

interface WpPostProps {
  post: WpPost;
  className?: string;
  onPostLoaded?: (post: WpPost) => void;
}

export type { WpPostProps };
