import { GraphQLClient } from 'graphql-request';

const clients: Record<string, GraphQLClient> = {};

export async function getGraphQLClient(url: string): Promise<GraphQLClient> {
    if (clients[url]) return clients[url];

    const { GraphQLClient } = await import('graphql-request');

    const token = localStorage.getItem('access_token');
    const client = new GraphQLClient(url, {
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });

    clients[url] = client;
    return client;
}
