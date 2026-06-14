import { useQuery } from '@tanstack/react-query';
import { useWpConfig } from '@components/providers/WpConfigProvider';
import { WpMedia } from '@models/components/WpMedia';

export const useMedia = (params?: Record<string, any>) => {
  const { restUrl } = useWpConfig();
  return useQuery<WpMedia[]>({
    queryKey: ['wp-media', params],
    queryFn: async () => {
      const response = await fetch(`${restUrl}/wp/v2/media?${new URLSearchParams(params)}`).then(
        (r) => r.json()
      );
      return response as WpMedia[];
    },
    enabled: !!restUrl,
  });
};
