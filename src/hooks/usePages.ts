import { useQuery } from '@tanstack/react-query';
import { WpPost } from '@models/post'; // WP pages are post type
import { WpRestClient } from '@api/WpRestClient';
import { useWpConfig } from '@components/providers/WpConfigProvider';

export const usePages = (params?: Record<string, any>) => {
  const { restUrl } = useWpConfig();
  return useQuery<WpPost[]>({
    queryKey: ['wp-pages', params],
    queryFn: async () => {
      const client = new WpRestClient({ baseURL: restUrl });
      const response = await client.get('/wp/v2/pages', params);
      return response as WpPost[];
    },
    enabled: !!restUrl,
  });
};
