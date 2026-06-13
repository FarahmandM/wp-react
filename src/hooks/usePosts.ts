import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { WpPost } from '@models/post';
import { WpRestClient } from '@api/WpRestClient';
import { useWpConfig } from '@components/providers/WpConfigProvider';
import { keepPreviousData } from '@tanstack/react-query';

interface UsePostsResult {
    posts: WpPost[];
    totalPages?: number;
    totalItems?: number;
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
}

export const usePosts = (
    params?: Record<string, any>,
    opts?: UseQueryOptions<
        { posts: WpPost[]; totalPages: number; totalItems: number },
        Error
    >
): UsePostsResult => {
    const { restUrl } = useWpConfig();

    const query = useQuery<
        { posts: WpPost[]; totalPages: number; totalItems: number },
        Error
    >({
        queryKey: ['wp-posts', params],
        queryFn: async () => {
            const client = new WpRestClient({ baseURL: restUrl });

            const response = await client.client.get('/wp/v2/posts', {
                params: { ...params, _embed: true }
            });

            return {
                posts: response.data as WpPost[],
                totalPages: Number(response.headers?.['x-wp-totalpages']),
                totalItems: Number(response.headers?.['x-wp-total'])
            };
        },
        enabled: !!restUrl,
        //keepPreviousData: true,
        placeholderData: keepPreviousData,
        ...opts
    });

    return {
        posts: query.data?.posts ?? [],
        totalPages: query.data?.totalPages,
        totalItems: query.data?.totalItems,
        isLoading: query.isLoading,
        error: query.error ?? null,
        refetch: query.refetch
    };
};
