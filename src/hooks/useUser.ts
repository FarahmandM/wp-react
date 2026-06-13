import { useQuery } from '@tanstack/react-query';
import { WpUser } from '@models/user';
import { WpRestClient } from '@api/WpRestClient';
import { useWpConfig } from '@components/providers/WpConfigProvider';

export const useUser = (id: number) => {
    const { restUrl } = useWpConfig();
    const query = useQuery<WpUser>({
        queryKey: ['wp-user', id],
        queryFn: async () => {
            const client = new WpRestClient({ baseURL: restUrl });
            const response = await client.get(`/wp/v2/users/${id}`);
            return response as WpUser;
        },
        enabled: !!id && !!restUrl,
    });

    return {
        user: query.data,
        isLoading: query.isLoading,
        error: query.error,
        refetch: query.refetch
    };
};
