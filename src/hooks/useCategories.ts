import { useQuery } from '@tanstack/react-query';
import { WpCategory } from '@models/category';
import { WpRestClient } from '@api/WpRestClient';
import { useWpConfig } from '@components/providers/WpConfigProvider';

export const useCategories = (params?: Record<string, any>) => {
    const { restUrl } = useWpConfig();

    const query = useQuery<WpCategory[], Error>({
        queryKey: ['wp-categories', params],
        queryFn: async () => {
            const client = new WpRestClient({ baseURL: restUrl });
            const response = await client.get('/wp/v2/categories', params);
            return response as WpCategory[];
        },
        enabled: !!restUrl,
    });

    return {
        categories: query.data ?? [],
        isLoading: query.isLoading,
        error: query.error,
        refetch: query.refetch,
    };
};