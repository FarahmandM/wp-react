import { useQuery } from '@tanstack/react-query';
import { WpPost } from '@models/post';
import { WpRestClient } from '@api/WpRestClient';
import { useWpConfig } from '@components/providers/WpConfigProvider';

export const usePost = (id: number) => {
    const { restUrl } = useWpConfig();

    return useQuery<WpPost>({
        queryKey: ['wp-post', id],
        queryFn: async () => {
            const client = new WpRestClient({ baseURL: restUrl });
            const response = await client.get(`/wp/v2/posts/${id}`, { _embed: true });
            return response as WpPost;
        },
        enabled: !!id && !!restUrl,
    });
};
