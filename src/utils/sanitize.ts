import DOMPurify from 'dompurify';

/**
 * Sanitize HTML string to prevent XSS attacks.
 * @param dirtyHtml - The HTML string to sanitize.
 * @returns The sanitized HTML string safe for `dangerouslySetInnerHTML`.
 */
export function sanitizeHtml(dirtyHtml: string): string {
  return DOMPurify.sanitize(dirtyHtml, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ['iframe'], // for embedded content
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'sandbox'],
    FORBID_TAGS: ['script', 'style', 'link'],
    FORBID_ATTR: ['onload', 'onerror'],
  });
}
