import React, { useEffect } from 'react';
import { sanitizeHtml } from '@utils/sanitize';
import { WpPostProps } from '@models/components/WpPost';

export const WpPost: React.FC<WpPostProps> = ({ post, className, onPostLoaded }) => {
  useEffect(() => {
    onPostLoaded?.(post);
  }, [post, onPostLoaded]);

  return (
    <article className={className}>
      <h2 dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.title.rendered) }} />
      <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content.rendered) }} />
    </article>
  );
};
