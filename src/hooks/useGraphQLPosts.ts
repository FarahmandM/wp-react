import { useQuery } from '@tanstack/react-query';
import { getGraphQLClient } from '@api/lazyGraphQLClient';
import { getConfig } from '@core/config';
import { PostFragment } from '@models/api/graphql/fragments';
import { WpGraphQLQueryPosts } from '@models/api/graphql/queries';

export const useGraphQLPosts = () => {
  return useQuery({
    queryKey: ['graphql-posts'],
    queryFn: async () => {
      const { graphqlUrl } = getConfig();
      if (!graphqlUrl) throw new Error('GraphQL URL is not configured');
      const client = await getGraphQLClient(graphqlUrl);

      const query = `
                ${PostFragment}
                query AllPosts {
                        posts {
                            nodes {
                                ...PostFragment
                            }
                        }
                }
            `;

      const data = await client.request<WpGraphQLQueryPosts>(query);
      return data.posts.nodes;
    },
  });
};
