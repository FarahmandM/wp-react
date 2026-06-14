import React from 'react';
import { sanitizeHtml } from '@utils/sanitize';

interface WpImageProps {
  image: {
    id: number;
    source_url: string;
    alt_text?: string;
    caption?: { rendered: string };
  };
  className?: string;
  sizes?: string;
}

export const WpImage: React.FC<WpImageProps> = ({ image, className, sizes }) => {
  return (
    <figure className={className}>
      <img src={image.source_url} alt={image.alt_text || ''} sizes={sizes} />
      {image.caption?.rendered && (
        <figcaption
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(image.caption.rendered),
          }}
        />
      )}
    </figure>
  );
};
